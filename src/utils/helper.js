import React from 'react';
import { useColorScheme } from 'react-native';


export const isDarkMode = () => {
    let scheme = useColorScheme();
    return scheme === "dark";
}