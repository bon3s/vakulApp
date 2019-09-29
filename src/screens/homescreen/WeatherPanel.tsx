import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import WeatherType from '../../service/WeatherType';
import WeatherIcon from './WeatherIcon';
import fonts from '../../assets/fonts';
import { colors } from '../../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
    weatherData: WeatherType;
}

interface State {
    nightMode: boolean;
}

export default class WeatherPanel extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nightMode: false,
        };
    }

    render() {
        if (this.props.weatherData) {
            return (
                <View style={style.weatherPanel}>
                    <View>
                        <Text style={style.panelCity}>
                            {this.props.weatherData.name}
                        </Text>
                        <View style={style.weatherIconWrapper}>
                            <WeatherIcon
                                nightMode={false}
                                iconCode={
                                    this.props.weatherData.icon
                                }></WeatherIcon>
                            <Text style={style.weatherStatus}>
                                {this.props.weatherData.description}
                            </Text>
                        </View>
                    </View>
                    <View style={style.weatherInfo}>
                        <View style={style.weatherColumnLeft}>
                            <View style={style.currentTemp}>
                                <Image
                                    style={style.tempIcon}
                                    source={require('../../assets/img/icons/18.png')}
                                />
                                <View style={style.tempWrapper}>
                                    <Text style={style.tempText}>
                                        <Text>
                                            {Math.floor(
                                                this.props.weatherData.temp
                                            )}
                                        </Text>
                                        <MaterialCommunityIcons
                                            style={style.tempUnit}
                                            name={'temperature-celsius'}
                                            size={40}
                                        />
                                    </Text>
                                </View>
                            </View>
                            <View style={style.windInfo}>
                                <Feather
                                    style={style.tempUnit}
                                    name={'wind'}
                                    size={25}
                                />
                                <Text style={style.windSpeed}>
                                    {this.props.weatherData.windSpeed + ' km/h'}
                                </Text>
                            </View>
                        </View>
                        <View style={style.weatherColumnRight}>
                            <View style={style.otherInfoItem}>
                                <Text style={style.otherInfoLabel}>
                                    Min. temp:
                                </Text>
                                <Text style={style.otherInfoText}>
                                    {Math.floor(this.props.weatherData.tempMin)}{' '}
                                    °C
                                </Text>
                            </View>
                            <View style={style.otherInfoItem}>
                                <Text style={style.otherInfoLabel}>
                                    Max. temp:
                                </Text>
                                <Text style={style.otherInfoText}>
                                    {Math.floor(this.props.weatherData.tempMax)}{' '}
                                    °C
                                </Text>
                            </View>
                            <View style={style.otherInfoItem}>
                                <Text style={style.otherInfoLabel}>
                                    Humidity:
                                </Text>
                                <Text style={style.otherInfoText}>
                                    {this.props.weatherData.humidity} %
                                </Text>
                            </View>
                            <View style={style.otherInfoItem}>
                                <Text style={style.otherInfoLabel}>
                                    Pressure:
                                </Text>
                                <Text style={style.otherInfoText}>
                                    {this.props.weatherData.pressure} hPa
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
}

const style = StyleSheet.create({
    weatherPanel: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    weatherPanelNight: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    panelCity: {
        fontSize: 25,
        fontFamily: fonts.fontRegular,
        color: colors.textColor,
        textAlign: 'center',
    },
    weatherStatus: {
        fontSize: 18,
        fontFamily: fonts.fontRegular,
        color: colors.textColor,
        textAlign: 'center',
        marginTop: 15,
    },
    weatherIconWrapper: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    weatherColumnLeft: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentTemp: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherColumnRight: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tempWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    tempText: {
        fontSize: 50,
        fontFamily: fonts.fontMedium,
        color: colors.textColor,
        textAlign: 'center',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tempIcon: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
    },
    tempUnit: {
        color: colors.textColor,
    },
    windInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
    },
    windSpeed: {
        fontSize: 18,
        fontFamily: fonts.fontRegular,
        color: colors.textColor,
        textAlign: 'center',
        marginLeft: 20,
    },
    otherInfoItem: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    otherInfoLabel: {
        fontSize: 15,
        fontFamily: fonts.fontMedium,
        color: colors.textColor,
    },
    otherInfoText: {
        fontSize: 15,
        fontFamily: fonts.fontRegular,
        color: colors.textColor,
        marginLeft: 8,
    },
});
