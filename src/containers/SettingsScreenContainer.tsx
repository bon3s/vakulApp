import React, { Component } from 'react';
import SettingsScreen from '../screens/settingsscreen/SettingsScreen';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { AppState } from '../redux/AppState';
import { Dispatch } from 'redux';
import { removeWeatherItem, setWeatherItem } from '../redux/weatherActions';
import service from '../service/service';
import { AsyncStorage } from 'react-native';
import { WeatherWithTimestamp } from '../redux/weatherReducer';
import moment from 'moment';

interface Props extends NavigationDrawerScreenProps {
    weatherData: WeatherWithTimestamp[];
    dispatch: Dispatch;
}

interface State {
    modalVisible: boolean;
    showAlreadyExistsPrompt: boolean;
    showNotFoundPrompt: boolean;
    errorModalVisible: boolean;
}

class SettingsScreenContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalVisible: false,
            errorModalVisible: false,
            showAlreadyExistsPrompt: false,
            showNotFoundPrompt: false,
        };
    }

    public toggleModal = () => {
        if (this.state.modalVisible) {
            this.setState({
                modalVisible: false,
            });
        } else {
            this.setState({
                modalVisible: true,
            });
        }
    };

    public closeErrorModal = () => {
        this.setState({ errorModalVisible: false });
    };

    public handleMenuPress = () => {
        this.props.navigation.openDrawer();
    };

    public handleDeleteItem = (city: string) => {
        this.props.dispatch(removeWeatherItem(city));
        AsyncStorage.removeItem('@cache/weather/' + city);
    };

    private async callService(city: string) {
        const temp = city.replace(/\s/g, '%20');

        await service
            .getWeather(temp)
            .then(res => {
                if (res !== undefined) {
                    this.props.dispatch(
                        setWeatherItem({
                            city: res.data[0],
                            timestamp: moment(),
                        })
                    );
                } else {
                    this.setState({
                        modalVisible: false,
                        errorModalVisible: true,
                    });
                }
            })
            .catch(e => console.log(e));
    }

    public handleAddItem = (city: string) => {
        if (
            city !== '' &&
            city !== undefined &&
            city !== ' ' &&
            this.props.weatherData.length !== 0
        ) {
            const checkArr = this.props.weatherData.map(item => {
                if (item.city.name.toLowerCase() === city.toLowerCase())
                    return true;
            });
            let check = false;
            checkArr.forEach(item => {
                if (item) {
                    check = true;
                }
            });
            if (check) {
                this.setState({ showAlreadyExistsPrompt: true });
                setTimeout(() => {
                    this.setState({ showAlreadyExistsPrompt: false });
                }, 5000);
            } else {
                this.callService(city);
            }
        } else {
            this.callService(city);
        }
    };

    public handleSettingsItemPress(city: string) {
        console.log(this.props.navigation);
    }

    public render() {
        return (
            <SettingsScreen
                handleSettingsItemPress={this.handleSettingsItemPress}
                notFoundPrompt={this.state.showNotFoundPrompt}
                modalVisible={this.state.modalVisible}
                toggleModal={this.toggleModal}
                closeErrorModal={this.closeErrorModal}
                errorModalVisible={this.state.errorModalVisible}
                warningPrompt={this.state.showAlreadyExistsPrompt}
                handleAddItem={this.handleAddItem}
                handleDeleteItem={this.handleDeleteItem}
                weatherData={this.props.weatherData}
                handleMenuPress={this.handleMenuPress}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    weatherData: state.weather.citiesArray,
});

export default connect(mapStateToProps)(SettingsScreenContainer);
