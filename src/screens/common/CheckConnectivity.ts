import NetInfo from '@react-native-community/netinfo';

export function checkConnectivity() {
    const status = NetInfo.fetch().then(state => {
        state.isConnected ? true : false;
    });
    return status;
}
