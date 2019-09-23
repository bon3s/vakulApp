import React, { Component } from 'react';
import HomeScreen from '../screens/homescreen/HomeScreen';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {}

class HomeScreenContainer extends Component<Props> {
    public handleMenuPress = () => {
        this.props.navigation.openDrawer();
    };

    public render() {
        return (
            <HomeScreen
                handleMenuPress={this.handleMenuPress}
                {...this.props}
            />
        );
    }
}

export default HomeScreenContainer;
