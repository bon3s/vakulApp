import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import fonts from '../../assets/fonts';
import { colors } from '../../assets/colors';

interface Props {
    visible: boolean;
    warningPrompt: boolean;
    notFoundPrompt: boolean;
    toggleModal: () => void;
    handleAddItem: (city: string) => void;
}

interface State {
    inputText: string;
}

class SettingsModal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            inputText: '',
        };
    }

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => this.props.toggleModal()}>
                <TouchableOpacity
                    style={style.backdrop}
                    onPress={() => this.props.toggleModal()}>
                    <View style={style.modalWrapper}>
                        <View pointerEvents={'none'}>
                            <Text style={style.modalText}>
                                Please enter the desired weather forecast
                                location.
                            </Text>
                        </View>
                        <TextInput
                            onChangeText={val =>
                                this.setState({ inputText: val })
                            }
                            value={this.state.inputText}
                            style={style.textInput}
                        />
                        {this.props.warningPrompt ? (
                            <Text style={style.warning}>
                                This city is already added.
                            </Text>
                        ) : null}
                        {this.props.notFoundPrompt ? (
                            <Text style={style.warning}>
                                No city was found, please try again.
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={style.button}
                            disabled={
                                this.state.inputText.length !== 0 &&
                                this.state.inputText !== ' '
                                    ? false
                                    : true
                            }
                            onPress={e => {
                                e.stopPropagation();
                                this.props.handleAddItem(this.state.inputText);
                                this.setState({ inputText: '' });
                                this.props.toggleModal();
                            }}>
                            <Text style={style.buttonText}>Add Location</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const style = StyleSheet.create({
    modalWrapper: {
        marginTop: '30%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 20,
        zIndex: 5,
        elevation: 5,
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    modalText: {
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        fontSize: 20,
        color: colors.primary,
    },
    warning: {
        marginTop: 10,
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        fontSize: 12,
        color: colors.textColor,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        padding: 15,
        textAlign: 'center',
        backgroundColor: colors.primary,
        color: '#fff',
        fontFamily: fonts.fontMedium,
        borderRadius: 8,
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        color: colors.textColor,
        fontFamily: fonts.fontRegular,
        fontSize: 15,
        marginTop: 10,
    },
});

export default SettingsModal;
