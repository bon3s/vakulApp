import { AsyncStorage } from 'react-native';

export async function setToAsyncStorage(
    data: any,
    path: string
): Promise<boolean> {
    return await AsyncStorage.setItem(path, JSON.stringify(data))
        .then(res => true)
        .catch(e => false);
}

export async function getFromAsyncStorage(path: string): Promise<any> {
    return await AsyncStorage.getItem(path)
        .then(res => {
            return JSON.parse(res);
        })
        .catch(e => {
            throw e;
        });
}
