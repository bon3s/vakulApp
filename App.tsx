import React, { Component } from 'react';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import RootContainer from './src/containers/RootContainer';
import { SafeAreaView, AsyncStorage } from 'react-native';
import LoadingModal from './src/screens/common/LoadingModal';
import { setWeatherItem, removeWeatherItem } from './src/redux/weatherActions';
import { startLoading, stopLoading } from './src/redux/loadingActions';
import { WeatherWithTimestamp } from './src/redux/weatherReducer';
import { AppState } from './src/redux/AppState';
import moment from 'moment';
import service from './src/service/service';
import ErrorModal from './src/screens/common/ErrorModal';
import { checkConnectivity } from './src/screens/common/CheckConnectivity';

interface Props extends NavigationDrawerScreenProps {
    dispatch: Dispatch;
    weatherData: WeatherWithTimestamp[];
}
interface State {
    loading: boolean;
    connErrorModalVisible: boolean;
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            connErrorModalVisible: false,
        };
    }

    async componentDidMount() {
        this.getAllFromStorage();
        setInterval(() => {
            if (checkConnectivity()) {
                this.checkIfUpToDate();
            } else {
                this.setState({ connErrorModalVisible: true });
            }
        }, 930000);
    }

    public closeModal() {
        this.setState({ connErrorModalVisible: false });
    }

    private async checkIfUpToDate() {
        this.props.weatherData.forEach(item => {
            if (
                moment(item.timestamp).isBefore(
                    moment().subtract(15, 'minutes')
                ) == true
            ) {
                this.props.dispatch(removeWeatherItem(item.city.name));
                AsyncStorage.removeItem('@cache/weather/' + item.city.name);
                this.callService(item.city.name);
            } else {
                return;
            }
        });
    }

    private async callService(city: string) {
        const temp = city.replace(/\s/g, '%20');

        await service
            .getWeather(temp)
            .then(res => {
                this.props.dispatch(
                    setWeatherItem({
                        city: res.data[0],
                        timestamp: moment(),
                    })
                );
            })
            .catch(e => console.log(e));
    }

    async getAllFromStorage() {
        startLoading('getFromAsyncStorage');
        try {
            const keys = await AsyncStorage.getAllKeys();
            let itemsArray;
            if (keys.length !== 0) {
                itemsArray = await AsyncStorage.multiGet(
                    keys,
                    (err, stores) => {
                        stores.forEach((result, i, store) => {
                            const timestamp = JSON.parse(store[i][1]).time;
                            const data = JSON.parse(store[i][1]).weather
                                .data[0];
                            this.props.dispatch(
                                setWeatherItem({
                                    city: data,
                                    timestamp: timestamp,
                                })
                            );
                        });
                    }
                );
                if (itemsArray !== null && itemsArray.length !== 0) {
                    stopLoading('getFromAsyncStorage');
                }
                return itemsArray;
            } else {
                return;
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LoadingModal>
                    <RootContainer
                        screenProps={this.props.screenProps}
                        navigation={this.props.navigation}
                        theme={this.props.theme}
                    />
                </LoadingModal>
                <ErrorModal
                    closeModal={this.closeModal}
                    visible={this.state.connErrorModalVisible}
                    message={
                        'Your device is offline. You can currently see the last available weather data.'
                    }></ErrorModal>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    weatherData: state.weather.citiesArray,
});

export default connect(mapStateToProps)(App);
