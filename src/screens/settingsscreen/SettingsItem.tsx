import React, { Component } from 'react';
import WeatherType from '../../service/weatherType';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
} from 'react-native';
import fonts from '../../assets/fonts';
import { colors } from '../../assets/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
    weatherData: WeatherType;
    handleDeleteItem: (city: string) => void;
}
interface State {
    longpressed: boolean;
    timeout: number;
}

class SettingsItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            longpressed: false,
            timeout: null,
        };
    }

    public handleLongPress = () => {
        this.setState({ longpressed: true });
        this.handleTimeout();
    };

    public handleShortPress = () => {
        this.setState({ longpressed: false });
    };

    public handleTimeout = () => {
        const timeout = setTimeout(() => {
            if (this.state.longpressed) {
                clearInterval(timeout);
                this.setState({ longpressed: false });
            } else {
                clearInterval(timeout);
            }
        }, 10000);
    };

    render() {
        return (
            <TouchableOpacity
                onLongPress={this.handleLongPress}
                style={style.weatherItem}>
                {this.state.longpressed ? (
                    <TouchableWithoutFeedback
                        onPress={() =>
                            this.props.handleDeleteItem(
                                this.props.weatherData.name
                            )
                        }
                        style={style.deleteIcon}>
                        <MaterialCommunityIcons
                            style={style.deleteIcon}
                            name={'close-circle'}
                            size={25}
                        />
                    </TouchableWithoutFeedback>
                ) : null}
                <View style={style.itemWrapper}>
                    <View style={style.city}>
                        <Entypo
                            style={style.location}
                            name={'location-pin'}
                            size={30}
                        />
                        <Text style={style.cityName}>
                            {this.props.weatherData.name},
                            {this.props.weatherData.country}
                        </Text>
                    </View>
                    <View style={style.itemExcerpt}>
                        <Text style={style.temperature}>
                            temp: {Math.floor(this.props.weatherData.temp)}°C
                        </Text>
                        <Text style={style.description}>
                            {this.props.weatherData.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    weatherItem: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        marginBottom: 15,
    },
    deleteIcon: {
        position: 'absolute',
        top: -5,
        right: -5,
        color: colors.textColor,
        elevation: 12,
        zIndex: 12,
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '100%',
    },
    city: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        color: colors.textColor,
    },
    cityName: {
        fontFamily: fonts.fontMedium,
        fontSize: 20,
        color: colors.textColor,
        marginLeft: 5,
        flexWrap: 'wrap',
    },
    itemExcerpt: {
        alignItems: 'flex-end',
    },
    temperature: {
        fontFamily: fonts.fontMedium,
        fontSize: 15,
        color: colors.primary,
    },
    description: {
        marginTop: 5,
        fontFamily: fonts.fontMedium,
        fontSize: 15,
        color: colors.primary,
    },
});

export default SettingsItem;
