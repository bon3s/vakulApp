import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import MainRouter from './src/router/MainRouter';
import { NavigationScreenProps } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import service from './src/service/service';
console.disableYellowBox = true;
interface Props extends NavigationScreenProps {}

export class App extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        service.getWeather('Osijek').then(res => {
            console.log('iz app', res);
        });
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
