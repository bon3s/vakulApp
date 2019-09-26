import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import WeatherPanel from './WeatherPanel';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import WeatherType from '../../service/weatherType';

interface State {
    loading: boolean;
}

interface Props extends NavigationDrawerScreenProps {
    handleMenuPress: () => void;
    weatherData: WeatherType[];
}

class HomeScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderWithMenuButton
                    handleMenuPress={this.props.handleMenuPress}
                    currentPage={this.props.navigation.state.routeName}
                />
                <View style={style.container}>
                    <WeatherPanel weatherData={this.props.weatherData[0]} />
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        padding: 12,
    },
});

export default HomeScreen;
