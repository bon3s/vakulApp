import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import { NavigationScreenProps } from 'react-navigation';
import WeatherPanel from './WeatherPanel';

interface State {
    loading: boolean;
}

interface Props extends NavigationScreenProps {
    handleMenuPress: () => void;
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
                    navigation={this.props.navigation}
                />
                <View style={style.container}>
                    <WeatherPanel />
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
