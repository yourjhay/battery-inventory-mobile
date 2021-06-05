import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const setSession = async(key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.log(`The error is: ${e}`);
    }
}

export const getSession = async (key) => {
    try {
        let data = await AsyncStorage.getItem(key);
        return JSON.parse(data);
    } catch (e) {
        console.log(`The error is: ${e}`);
    }
}

export const removeSession = async (key) => {
    try {
        AsyncStorage.removeItem(key)
        // console.log('deleted session');
    } catch (e) {
        console.log(`The error is: ${e}`)
    }
}

export default {
    setSession,
    getSession,
    removeSession
};