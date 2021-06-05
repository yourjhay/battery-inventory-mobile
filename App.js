import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react'
import { Platform, View, StatusBar } from 'react-native';
import { StyleProvider, Root } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import RootStack from './src/routes/routes';
import Splash from './src/screens/Splash';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { getInitialState } from "./src/redux/initialState";
import configureStore from './src/utils/configureStore'
const store = configureStore(getInitialState)
const _DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};

const App = () => {
  const scheme = useColorScheme();
  const [mount, setMount] = useState(false)
  useEffect(() => {
    let mount = true
    setTimeout(() => {
      setMount(true)
    }, 4000);
    return () => mount = false
  })

  return (
    <Provider store={store}>
    <Root>
      { Platform.OS === 'android' ? <StatusBar backgroundColor={scheme === "dark" ? 'black' : 'white'} barStyle={scheme === "dark" ? '' : 'dark-content'}/> : <StatusBar backgroundColor="transparent" {...scheme != "dark" && {barStyle: "dark-content"}}/> }
      <StyleProvider style={getTheme(material)}>
        {mount ? (
            <RootStack/>
          ) : Platform.OS == 'android' ? (
            <Splash/>
          ) : (
            <View />
          )}
      </StyleProvider>
    </Root>
    </Provider>
  );
};

export default App;