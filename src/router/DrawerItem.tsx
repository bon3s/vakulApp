import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const drawerLogo = require('../assets/img/vakulAPPsmall.png');

export const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView style={style.container}>
            <View style={style.drawerLogo}>
                <Image source={drawerLogo} />
            </View>
            <DrawerNavigatorItems
                {...props}
                activeLabelStyle={{ color: '#27576B', fontSize: 15 }}
                inactiveLabelStyle={{ color: '#6E92A1', fontSize: 15 }}
                itemStyle={style.itemStyle}
            />
        </SafeAreaView>
    </ScrollView>
);

interface iconInfo {
    name: string;
    color: string;
    size: number;
}

export const drawerIcon = (val: iconInfo) => {
    return (
        <View style={{ marginRight: 5, minWidth: val.size }}>
            <MaterialCommunityIcons
                color={val.color}
                name={val.name}
                size={val.size}
            />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerLogo: {
        flex: 1,
        resizeMode: 'cover',
    },
    itemStyle: {
        paddingVertical: 10,
        color: '#27576B',
    },
});
