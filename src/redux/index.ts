import { combineReducers } from 'redux';
import loading from './loadingReducer';
import weather from './weatherReducer';

export default combineReducers({
    loading,
    weather,
});
