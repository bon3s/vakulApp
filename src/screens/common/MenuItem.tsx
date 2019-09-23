import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
    menuItem: string;
    onMenuItemPress: () => void;
}
export default function MenuItem(p: Props) {
    return (
        <TouchableOpacity onPress={p.onMenuItemPress}>
            <View style={style.menuItem}>
                <Text style={style.itemText}>{p.menuItem}</Text>
            </View>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    menuItem: {
        paddingVertical: 10,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: '#000',
        fontSize: 20,
    },
});
