import React, { Component } from 'react';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import RootContainer from './src/containers/RootContainer';
import { SafeAreaView, AsyncStorage } from 'react-native';
import LoadingModal from './src/screens/common/LoadingModal';
import { getFromAsyncStorage } from './src/asyncStorage/asyncStorage';
import { setWeatherItem } from './src/redux/weatherActions';

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

    async componentDidMount() {
        console.log(this.getAllFromStorage());
    }

    async getAllFromStorage() {
        try {
            const keys = await AsyncStorage.getAllKeys();
            let itemsArray;
            if (keys.length !== 0) {
                itemsArray = await AsyncStorage.multiGet(
                    keys,
                    (err, stores) => {
                        stores.forEach((result, i, store) => {
                            this.props.dispatch(
                                setWeatherItem(JSON.parse(store[0][1]).data[0])
                            );
                        });
                    }
                );
                return itemsArray;
            } else {
                return;
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <LoadingModal>
                    <RootContainer
                        screenProps={this.props.screenProps}
                        navigation={this.props.navigation}
                        theme={this.props.theme}
                    />
                </LoadingModal>
            </SafeAreaView>
        );
    }
}

export default connect()(App);
