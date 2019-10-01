export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';

export const setConnectionStatus = (value: boolean) => ({
    type: SET_CONNECTION_STATUS,
    value,
});
