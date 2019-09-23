import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import MainRouter from './src/router/MainRouter';
import { NavigationScreenProps } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

interface Props extends NavigationScreenProps {}

export class App extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

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

export default App;
