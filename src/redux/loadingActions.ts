export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export const startLoading = (name: string) => ({
    type: START_LOADING,
    name,
});

export const stopLoading = (name: string) => ({
    type: STOP_LOADING,
    name,
});
