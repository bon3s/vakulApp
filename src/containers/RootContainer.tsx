import React from 'react';
import { Component } from 'react';
import { SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MainRouter from '../router/MainRouter';

export default class RootContainer extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#fff', '#A1BBC7', '#27576B']}>
                    <MainRouter />
                </LinearGradient>
            </SafeAreaView>
        );
    }
}
