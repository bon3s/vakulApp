import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Props {
    city: string;
    weatherIcon: string;
    weatherStatus: string;
}
interface State {}

export default class WeatherPanel extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={style.weatherPanel}>
                <View style={style.weatherIconWrapper}></View>
                <View style={style.weatherInfo}>
                    <Text style={style.panelCity}>Osijek</Text>
                    <Text style={style.weatherStatus}>Windy</Text>
                    <Text style={style.temperature}>31*C</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    weatherPanel: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    weatherIconWrapper: {},
    weatherInfo: {},
    panelCity: {},
    weatherStatus: {},
    temperature: {},
});
