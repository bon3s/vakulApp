import React, { Component } from 'react';
import { RouterProps } from 'react-router';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import { NavigationScreenProps } from 'react-navigation';

interface State {
    loading: boolean;
}

interface Props extends NavigationScreenProps {
    handleMenuPress: () => void;
}

class SettingsScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    render() {
        return (
            <SafeAreaView>
                <HeaderWithMenuButton
                    handleMenuPress={this.props.handleMenuPress}
                    currentPage={this.props.navigation.state.routeName}
                    navigation={this.props.navigation}
                />
                <View style={style.container}></View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        padding: 12,
    },
});

export default SettingsScreen;
