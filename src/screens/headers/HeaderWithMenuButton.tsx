import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { NavigationScreenProps } from 'react-navigation';
import fonts from '../common/fonts';

interface Props extends NavigationScreenProps {
    handleMenuPress: () => void;
    currentPage: string;
}

class HeaderWithMenuButton extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <View style={style.headerWrapper}>
                    <TouchableOpacity
                        onPress={this.props.handleMenuPress}
                        style={style.menuButton}>
                        <MaterialCommunityIcons
                            style={style.menuIcon}
                            name={'menu'}
                            size={25}
                        />
                    </TouchableOpacity>
                    <View style={style.pageWrapper}>
                        <View style={style.appName}>
                            <AntDesign
                                style={style.titleIcon}
                                name={'cloudo'}
                                size={25}
                            />
                            <Text style={style.currentPage}>
                                {this.props.currentPage == 'Home'
                                    ? 'VakulAPP'
                                    : this.props.currentPage}
                            </Text>
                            <AntDesign
                                style={style.titleIcon}
                                name={'cloudo'}
                                size={25}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }} />
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#6E91A1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        color: '#fff',
    },
    pageWrapper: {
        marginLeft: 50,
    },
    titleIcon: {
        marginHorizontal: 20,
        color: '#fff',
    },
    currentPage: {
        flexDirection: 'row',
        color: '#fff',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.fontMedium,
    },
    appName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default HeaderWithMenuButton;
