import React, { Component } from 'react';
import { Modal, ActivityIndicator, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../../redux/AppState';
import { State as LoadingState } from '../../redux/loadingReducer';
import { colors } from './colors';

interface Props {
    readonly loadingState: LoadingState;
    readonly children: JSX.Element;
}

function loadingScreen(loading) {
    return (
        <Modal visible={loading} transparent={true}>
            <View style={style.modalContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        </Modal>
    );
}

class LoadingModal extends Component<Props> {
    render() {
        let loading = false;
        for (var property in this.props.loadingState) {
            if (this.props.loadingState.hasOwnProperty(property)) {
                if (this.props.loadingState[property]) {
                    loading = true;
                }
            }
        }
        return (
            <View style={{ flex: 1 }}>
                {loadingScreen(loading)}
                {this.props.children}
            </View>
        );
    }
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state: AppState) => ({
    loadingState: state.loading,
});

export default connect(mapStateToProps)(LoadingModal);
