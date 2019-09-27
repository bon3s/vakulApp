import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import WeatherPanel from './WeatherPanel';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import WeatherType from '../../service/weatherType';
import fonts from '../../assets/fonts';
import { colors } from '../../assets/colors';

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
        if (this.props.weatherData.length !== 0) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderWithMenuButton
                        theme={this.props.theme}
                        navigation={this.props.navigation}
                        screenProps={this.props.screenProps}
                        handleMenuPress={this.props.handleMenuPress}
                        currentPage={this.props.navigation.state.routeName}
                    />
                    <View style={style.container}>
                        <WeatherPanel weatherData={this.props.weatherData[0]} />
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderWithMenuButton
                        theme={this.props.theme}
                        navigation={this.props.navigation}
                        screenProps={this.props.screenProps}
                        handleMenuPress={this.props.handleMenuPress}
                        currentPage={this.props.navigation.state.routeName}
                    />
                    <View style={style.container}>
                        <Text style={style.warning}>
                            Please add a location in the settings screen.
                        </Text>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

const style = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
    },
    warning: {
        marginTop: 30,
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        fontSize: 20,
        color: colors.primary,
    },
});

export default HomeScreen;
