import { AnyAction } from 'redux';
import { SET_CONNECTION_STATUS } from './connectivityActions';

export interface State {
    connected: boolean;
}

const initState: State = {
    connected: true,
};

const LoadingReducer = (state: State = initState, action: AnyAction): State => {
    switch (action.type) {
        case SET_CONNECTION_STATUS:
            return { ...state, connected: action.value };

        default:
            return state;
    }
};

export default LoadingReducer;
