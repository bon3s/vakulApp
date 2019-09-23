import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreenContainer from '../containers/HomeScreenContainer';
import SettingsScreenContainer from '../containers/SettingsScreenContainer';
import { createAppContainer } from 'react-navigation';
import { CustomDrawerContentComponent, drawerIcon } from './DrawerItem';
import { Dimensions } from 'react-native';

const MainRouter = createDrawerNavigator(
    {
        VakulApp: {
            screen: HomeScreenContainer,
            navigationOptions: {
                drawerIcon: drawerIcon({
                    name: 'weather-partlycloudy',
                    color: '#27576B',
                    size: 25,
                }),
            },
        },
        Settings: {
            screen: SettingsScreenContainer,
            navigationOptions: {
                drawerIcon: drawerIcon({
                    name: 'settings-outline',
                    color: '#27576B',
                    size: 25,
                }),
            },
        },
    },
    {
        drawerWidth: (Math.round(Dimensions.get('window').width) / 100) * 70,
        initialRouteName: 'VakulApp',
        contentComponent: CustomDrawerContentComponent,
    }
);

export default createAppContainer(MainRouter);
