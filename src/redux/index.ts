import { combineReducers } from 'redux';
import loading from './loadingReducer';
import weather from './weatherReducer';
import connectivity from './connectivityReducer';

export default combineReducers({
    connectivity,
    loading,
    weather,
});
