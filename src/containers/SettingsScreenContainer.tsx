import React, { Component } from 'react';
import SettingsScreen from '../screens/settingsscreen/SettingsScreen';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';

interface Props extends NavigationDrawerScreenProps {}

class SettingsScreenContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
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
