import { AnyAction } from 'redux';
import { START_LOADING, STOP_LOADING } from './loadingActions';

export interface State {
    [index: string]: boolean;
}

const initState: State = {};

const LoadingReducer = (state: State = initState, action: AnyAction): State => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, [action.name]: true };

        case STOP_LOADING:
            return { ...state, [action.name]: false };

        default:
            return state;
    }
};

export default LoadingReducer;
