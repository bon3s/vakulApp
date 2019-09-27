import React, { Component } from 'react';
import SettingsScreen from '../screens/settingsscreen/SettingsScreen';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { AppState } from '../redux/AppState';
import WeatherType from '../service/weatherType';
import { Dispatch } from 'redux';
import { removeWeatherItem, setWeatherItem } from '../redux/weatherActions';
import service from '../service/service';
interface Props extends NavigationDrawerScreenProps {
    weatherData: WeatherType[];
    dispatch: Dispatch;
}

interface State {
    showAlreadyExists: boolean;
}

class SettingsScreenContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showAlreadyExists: false,
        };
    }

    public handleMenuPress = () => {
        this.props.navigation.openDrawer();
    };

    public handleDeleteItem = (city: string) => {
        this.props.dispatch(removeWeatherItem(city));
    };

    private callService = (city: string) => {
        service
            .getWeather(city)
            .then(res => {
                this.props.dispatch(setWeatherItem(res.data[0]));
            })
            .catch(e => console.log(e));
    };

    public handleAddItem = (city: string) => {
        if (
            city !== '' &&
            city !== undefined &&
            city !== ' ' &&
            this.props.weatherData.length !== 0
        ) {
            this.props.weatherData.forEach(item => {
                if (item.name.toLowerCase() == city.toLowerCase()) {
                    this.setState({ showAlreadyExists: true });
                } else {
                    this.callService(city);
                }
            });
        } else {
            this.callService(city);
        }
    };

    public render() {
        return (
            <SettingsScreen
                warningPrompt={this.state.showAlreadyExists}
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
