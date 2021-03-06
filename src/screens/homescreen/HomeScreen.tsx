import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import HeaderWithMenuButton from '../headers/HeaderWithMenuButton';
import WeatherPanel from './WeatherPanel';
import { NavigationDrawerScreenProps } from 'react-navigation-drawer';
import fonts from '../../assets/fonts';
import { colors } from '../../assets/colors';
import Carousel from 'react-native-snap-carousel';
import { WeatherWithTimestamp } from '../../redux/weatherReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

interface State {
    loading: boolean;
}

interface Props extends NavigationDrawerScreenProps {
    handleMenuPress: () => void;
    weatherData: WeatherWithTimestamp[];
}

class HomeScreen extends Component<Props, State> {
    public carouselRef;
    public carouselProps: {};
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.carouselRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.carouselRef !== undefined && this.carouselRef !== null) {
            this.snapToIndex();
        }
    }

    private snapToIndex = () => {
        if (this.props !== null) {
            try {
                let temp = null;
                const carouselProps = this.carouselRef.props;
                if (carouselProps && carouselProps.data !== undefined) {
                    carouselProps.data.forEach((element, index) => {
                        if (
                            element.city.name ==
                            this.props.navigation.state.params.city
                        ) {
                            temp = index;
                        }
                    });
                }
                if (temp !== null) {
                    this.carouselRef.snapToItem(temp);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    render() {
        if (this.props.weatherData.length !== 0) {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderWithMenuButton
                        theme={this.props.theme}
                        navigation={this.props.navigation}
                        screenProps={this.props.screenProps}
                        handleMenuPress={this.props.handleMenuPress}
                        currentPage={this.props.navigation.state.routeName}
                    />
                    <View style={style.container}>
                        <Carousel
                            layout={'default'}
                            style={style.carousel}
                            data={this.props.weatherData}
                            loop={true}
                            activeSlideAlignment={'start'}
                            renderItem={item => {
                                const now = moment();
                                const nightStart = moment(
                                    item.item.sunset,
                                    'YYYY-MM-DD HH:mm:ss'
                                );
                                const nightEnd = moment(
                                    item.item.sunrise,
                                    'YYYY-MM-DD HH:mm:ss'
                                );
                                return (
                                    <WeatherPanel
                                        nightMode={now.isBetween(
                                            nightStart,
                                            nightEnd
                                        )}
                                        weatherData={item.item.city}
                                    />
                                );
                            }}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width - 24}
                            ref={c => {
                                this.carouselRef = c;
                            }}
                        />
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <HeaderWithMenuButton
                        theme={this.props.theme}
                        navigation={this.props.navigation}
                        screenProps={this.props.screenProps}
                        handleMenuPress={this.props.handleMenuPress}
                        currentPage={this.props.navigation.state.routeName}
                    />
                    <View style={style.container}>
                        <Text style={style.warning}>
                            Please add a location in the settings screen.
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Settings');
                            }}>
                            <Text style={style.buttonText}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

const style = StyleSheet.create({
    container: {
        padding: 12,
        flex: 1,
    },
    warning: {
        marginTop: 30,
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        fontSize: 20,
        color: colors.primary,
    },
    carousel: {},
    buttonText: {
        alignSelf: 'center',
        marginTop: 15,
        padding: 15,
        textAlign: 'center',
        backgroundColor: colors.primary,
        color: '#fff',
        fontFamily: fonts.fontMedium,
        borderRadius: 8,
    },
});

export default HomeScreen;
