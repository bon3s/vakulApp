import React, { Component } from 'react';
import SettingsScreen from '../screens/settingsscreen/SettingsScreen';
import { NavigationScreenProps } from 'react-navigation';

interface Props extends NavigationScreenProps {}

class SettingsScreenContainer extends Component<Props> {
    public handleMenuPress = () => {
        this.props.navigation.openDrawer();
    };

    public render() {
        return (
            <SettingsScreen
                handleMenuPress={this.handleMenuPress}
                {...this.props}
            />
        );
    }
}

export default SettingsScreenContainer;
