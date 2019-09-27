import React, { Component } from 'react';
import { RouterProps } from 'react-router';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import SettingsItem from './SettingsItem';
import WeatherType from '../../service/weatherType';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../common/colors';
import fonts from '../common/fonts';
import SettingsModal from './SettingsModal';

interface State {
    loading: boolean;
    modalVisible: boolean;
}

interface Props extends NavigationDrawerScreenProps {
    handleMenuPress: () => void;
    handleDeleteItem: (city: string) => void;
    handleAddItem: (city: string) => void;
    weatherData: WeatherType[];
    warningPrompt: boolean;
}

class SettingsScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            modalVisible: false,
        };
    }
    public toggleModal = () => {
        if (this.state.modalVisible) {
            this.setState({
                modalVisible: false,
            });
        } else {
            this.setState({
                modalVisible: true,
            });
        }
    };

    render() {
        return (
            <SafeAreaView>
                <HeaderWithMenuButton
                    handleMenuPress={this.props.handleMenuPress}
                    currentPage={this.props.navigation.state.routeName}
                />
                <View style={style.container}>
                    {this.props.weatherData.map((item, index) => {
                        return (
                            <SettingsItem
                                key={item.name}
                                weatherData={this.props.weatherData[index]}
                                handleDeleteItem={
                                    this.props.handleDeleteItem
                                }></SettingsItem>
                        );
                    })}
                    {this.props.weatherData.length !== 0 ? (
                        <Text style={style.infoText}>
                            Longpress any location to edit it.
                        </Text>
                    ) : (
                        <View></View>
                    )}
                    <View style={style.bottom}>
                        <TouchableOpacity onPress={() => this.toggleModal()}>
                            <Text style={style.buttonText}>Add Location</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SettingsModal
                    warningPrompt={this.props.warningPrompt}
                    handleAddItem={this.props.handleAddItem}
                    visible={this.state.modalVisible}
                    toggleModal={this.toggleModal}
                />
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        padding: 12,
    },
    infoText: {
        marginTop: 10,
        color: '#fff',
        fontFamily: fonts.fontRegular,
        fontSize: 15,
        textAlign: 'center',
    },
    bottom: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        padding: 15,
        textAlign: 'center',
        backgroundColor: colors.primary,
        color: '#fff',
        fontFamily: fonts.fontMedium,
        borderRadius: 8,
    },
});

export default SettingsScreen;
