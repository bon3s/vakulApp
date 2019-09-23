import { AnyAction } from 'redux';
import { NEW_ERROR } from './errorActions';

export interface ErrorItem {
    readonly error: Error;
    readonly timestamp: number;
}

export type State = ErrorItem[] | null;

const initState: State = null;

const ErrorReducer = (state: State = initState, action: AnyAction): State => {
    switch (action.type) {
        case NEW_ERROR:
            return state
                ? [
                      ...state,
                      {
                          error: action.error,
                          timestamp: Date.now(),
                      },
                  ]
                : [
                      {
                          error: action.error,
                          timestamp: Date.now(),
                      },
                  ];

        default:
            return state;
    }
};

export default ErrorReducer;
