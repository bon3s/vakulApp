import React, { Component } from 'react';
import HomeScreen from '../screens/homescreen/HomeScreen';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { AppState } from '../redux/AppState';
import WeatherType from '../service/weatherType';
import { Dispatch } from 'redux';

interface Props extends NavigationDrawerScreenProps {
    weatherData: WeatherType[];
    dispatch: Dispatch;
}

class HomeScreenContainer extends Component<Props> {
    public handleMenuPress = () => {
        this.props.navigation.openDrawer();
    };

    public render() {
        return (
            <HomeScreen
                navigation={this.props.navigation}
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

export default connect(mapStateToProps)(HomeScreenContainer);
