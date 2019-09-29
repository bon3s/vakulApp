import React, { Component } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import fonts from '../../assets/fonts';
import { colors } from '../../assets/colors';

interface Props {
    visible: boolean;
    message: string;
    closeModal: () => void;
}

class ErrorModal extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.props.closeModal}>
                <TouchableWithoutFeedback
                    style={style.backdrop}
                    onPress={this.props.closeModal}>
                    <View style={style.modalWrapper}>
                        <Text style={style.modalText}>
                            {this.props.message}
                        </Text>
                        <TouchableOpacity
                            style={style.button}
                            disabled={false}
                            onPress={this.props.closeModal}>
                            <Text style={style.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
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
        flexGrow: 1,
        width: '100%',
        height: '100%',
    },
    modalText: {
        textAlign: 'center',
        fontFamily: fonts.fontRegular,
        fontSize: 20,
        color: colors.primary,
    },
    button: {
        marginTop: 10,
        elevation: 15,
        zIndex: 15,
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

export default ErrorModal;
