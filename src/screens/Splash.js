import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Content,Footer } from 'native-base';
import { styles } from '../styles/Style';
import { isDarkMode} from '../utils';

const Splash = () => (
  <View style={[styles.flex1, styles.flexCol]}>
    <View style={[styles.flex1, styles.alignCenter, styles.justifyCenter]}>
        <Text style={[styles.font20, isDarkMode ? styles.textGray : styles.textDanger]}>AAO INVENTORY SYSTEM</Text>
    </View>
    <View style={[styles.flex1, styles.justifyCenter]}>
        <Text style={[styles.textCenter, styles.textGray]}> © 2021 All rights reserved.</Text>
    </View>
  </View>
);

export default Splash;