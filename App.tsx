import React, { Component } from 'react';
import service from './src/service/service';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setWeatherItem } from './src/redux/weatherActions';
import RootContainer from './src/containers/RootContainer';
import { View } from 'react-native';
import { AppState } from './src/redux/AppState';

interface Props extends NavigationDrawerScreenProps {
    dispatch: Dispatch;
}
interface State {
    loading: boolean;
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        service
            .getWeather('Osijek')
            .then(res => {
                this.props.dispatch(setWeatherItem(res.data[0]));
            })
            .catch(e => console.log(e));
    }

    public render() {
        if (!this.state.loading) return <RootContainer></RootContainer>;
        else return <View />;
    }
}

const mapStateToProps = (state: AppState) => ({
    loading: state.loading,
});

export default connect(mapStateToProps)(App);
