import React, { Component } from 'react';
import { RouterProps } from 'react-router';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import SettingsItem from './SettingsItem';
import WeatherType from '../../service/WeatherType';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets/colors';
import fonts from '../../assets/fonts';
import SettingsModal from './SettingsModal';
import ErrorModal from '../common/ErrorModal';
import { Dispatch } from 'redux';
import { WeatherWithTimestamp } from '../../redux/weatherReducer';
import SortableListView from 'react-native-sortable-listview';

interface State {
    loading: boolean;
}

interface Props extends NavigationDrawerScreenProps {
    handleMenuPress: () => void;
    handleDeleteItem: (city: string) => void;
    handleAddItem: (city: string) => void;
    closeErrorModal: () => void;
    toggleModal: () => void;
    handleSettingsItemPress: (city: string) => void;
    notFoundPrompt: boolean;
    modalVisible: boolean;
    errorModalVisible: boolean;
    weatherData: WeatherWithTimestamp[];
    warningPrompt: boolean;
    dispatch: Dispatch;
}

class SettingsScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    public data = [];
    public order = Object.keys(this.data);

    render() {
        this.props.weatherData.forEach(item => {
            this.data.push(item.city);
        });

        return (
            <SafeAreaView>
                <HeaderWithMenuButton
                    theme={this.props.theme}
                    navigation={this.props.navigation}
                    screenProps={this.props.screenProps}
                    handleMenuPress={this.props.handleMenuPress}
                    currentPage={this.props.navigation.state.routeName}
                />

                <ScrollView bounces={false} style={style.container}>
                    <View style={{ paddingBottom: 100 }}>
                        {this.props.weatherData.map((item, index) => {
                            return (
                                <SettingsItem
                                    handleSettingsItemPress={
                                        this.props.handleSettingsItemPress
                                    }
                                    key={item.city.name}
                                    weatherData={
                                        this.props.weatherData[index].city
                                    }
                                    handleDeleteItem={
                                        this.props.handleDeleteItem
                                    }></SettingsItem>
                            );
                        })}

                        {/* <SortableListView
                            style={{ flex: 1 }}
                            data={this.data}
                            order={this.order}
                            onRowMoved={e => {
                                this.order.splice(
                                    e.to,
                                    0,
                                    this.order.splice(e.from, 1)[0]
                                );
                                this.forceUpdate();
                            }}
                            renderRow={row => {
                                console.log(row);
                                return (
                                    <SettingsItem
                                        handleSettingsItemPress={
                                            this.props.handleSettingsItemPress
                                        }
                                        key={row.city.name}
                                        weatherData={
                                            this.props.weatherData[row].city
                                        }
                                        handleDeleteItem={
                                            this.props.handleDeleteItem
                                        }></SettingsItem>
                                );
                            }}
                        /> */}

                        {this.props.weatherData.length !== 0 ? (
                            <Text style={style.infoText}>
                                Longpress any location to edit it.
                            </Text>
                        ) : (
                            <View></View>
                        )}
                        <View style={style.bottom}>
                            <TouchableOpacity
                                onPress={() => this.props.toggleModal()}>
                                <Text style={style.buttonText}>
                                    Add Location
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <SettingsModal
                    notFoundPrompt={this.props.notFoundPrompt}
                    warningPrompt={this.props.warningPrompt}
                    handleAddItem={this.props.handleAddItem}
                    visible={this.props.modalVisible}
                    toggleModal={this.props.toggleModal}
                />
                <ErrorModal
                    visible={this.props.errorModalVisible}
                    message={'No city was found. Please try again.'}
                    closeModal={this.props.closeErrorModal}
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
