import React, { Component, useEffect } from 'react';
import { View, Image, SafeAreaView, FlatList } from 'react-native';
import { Container, Text, Content,Footer } from 'native-base';
import { styles } from '../styles/Style';
import { isDarkMode} from '../utils';
import { useState } from 'react/cjs/react.development';
import { supplierData } from '../utils/Api';


const Supplier = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getProduct();
    }, [])

    const getProduct = async () => {
        await supplierData().then(res => {
            setData(res);
        })
    }
    const Item = ( {item} ) => (
        <View style={[styles.p1, styles.flex, styles.flexRow, styles.justifySpaceBetween, styles.backgroundWhite, styles.mB1]}>
            <View>
                <Text style={[styles.font18]}>{item.name}</Text>
                <Text style={[styles.textGray]}>{item.address}</Text>
                <Text style={[styles.textGray]}>Brand: {item.brand}</Text>
            </View>
            <View>
                <Text style={[styles.textGray, styles.font25]}>{item.voltage}</Text>
            </View>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    return  (
    <View style={[styles.flex, styles.p1]}>
      <SafeAreaView style={styles.container}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        </SafeAreaView>
  </View>
  )
  
};

export default Supplier;