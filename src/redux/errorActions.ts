export const NEW_ERROR = 'NEW_ERROR';
export type NEW_ERROR = typeof NEW_ERROR;

export interface NewError {
    readonly type: NEW_ERROR;
    readonly error: string | Error;
}
export const newError = (error: Error): NewError => ({
    type: NEW_ERROR,
    error,
});
