import NetInfo from '@react-native-community/netinfo';
import { Dispatch } from 'redux';
import { setConnectionStatus } from '../../redux/connectivityActions';

interface Props {
    dispatch: Dispatch;
}

export default function checkConnectivityFunc(p: Props) {
    NetInfo.addEventListener(state => {
        state.isConnected
            ? p.dispatch(setConnectionStatus(true))
            : p.dispatch(setConnectionStatus(false));
    });
}
