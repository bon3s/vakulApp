import HomeScreenContainer from '../containers/HomeScreenContainer';
import SettingsScreenContainer from '../containers/SettingsScreenContainer';
import { createAppContainer } from 'react-navigation';
import { CustomDrawerContentComponent, drawerIcon } from './DrawerItem';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

const MainRouter = createDrawerNavigator(
    {
        VakulApp: {
            screen: HomeScreenContainer,
            path: '/HomeScreenContainer',
            params: {
                city: '',
            },
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
            path: '/SettingsScreenContainer',
            params: {
                city: '',
            },
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
