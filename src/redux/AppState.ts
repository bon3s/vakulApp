import { State as LoadingState } from './loadingReducer';

export interface AppState {
    readonly loading: LoadingState;
}
