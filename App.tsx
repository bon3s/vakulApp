import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import MainRouter from './src/router/MainRouter';
import LinearGradient from 'react-native-linear-gradient';
import service from './src/service/service';
import {
    NavigationScreenConfigProps,
    NavigationScreenProp,
} from 'react-navigation';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
console.disableYellowBox = true;
interface Props extends NavigationDrawerScreenProps {}

export class App extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        service
            .getWeather('Osijek')
            .then(res => {
                console.log('iz app', res);
            })
            .catch(e => console.log(e));
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
