import React, { Component, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Container, Text, Content,Footer } from 'native-base';
import { styles } from '../styles/Style';
import { isDarkMode} from '../utils';
import { Icon } from 'native-base';
import { dashboardData } from '../utils/Api';
import { useState } from 'react/cjs/react.development';

const Sales = () => {
    const [data, setData] = useState({
        products:'',
        sales: 0.00,
        users: '',
        suppliers: ''
    });
    const getDashboard = async () => [
        await dashboardData().then(res => {
            setData(res);
        }).catch(err=>{
            console.warn(err);
        })
    ]

    useEffect(() => {
        getDashboard(0)
    }, [])

    return (
        <View style={[styles.flex, styles.flexCol, styles.p1]}>
            <View style={[styles.mB1, styles.bordered, styles.p1, styles.rounded, styles.flex, styles.flexRow, styles.justifySpaceBetween, styles.alignCenter]}>
                <Icon name="shoppingcart" style={[styles.font50, styles.textBlue]} type="AntDesign"></Icon>
                <View style={[styles.alignEnd]}>
                    <Text style={[styles.font40]}>{data.products}</Text>
                    <Text style={[styles.font25, styles.textGray]}>Products</Text>
                </View>
            </View>
            <View style={[styles.mB1, styles.bordered, styles.p1, styles.rounded, styles.flex, styles.flexRow, styles.justifySpaceBetween, styles.alignCenter]}>
                <Icon name="linechart" style={[styles.font50, styles.textPink]} type="AntDesign"></Icon>
                <View style={[styles.alignEnd]}>
                    <Text style={[styles.font40]}>{data.sales}</Text>
                    <Text style={[styles.font25, styles.textGray]}>Sales</Text>
                </View>
            </View>
            <View style={[styles.mB1, styles.bordered, styles.p1, styles.rounded, styles.flex, styles.flexRow, styles.justifySpaceBetween, styles.alignCenter]}>
                <Icon name="account-group" style={[styles.font50, styles.textPink,{color:'#a714fc'}]} type="MaterialCommunityIcons"></Icon>
                <View style={[styles.alignEnd]}>
                    <Text style={[styles.font40]}>{data.users}</Text>
                    <Text style={[styles.font25, styles.textGray]}>Users</Text>
                </View>
            </View>
            <View style={[styles.mB1, styles.bordered, styles.p1, styles.rounded, styles.flex, styles.flexRow, styles.justifySpaceBetween, styles.alignCenter]}>
                <Icon name="boxes" style={[styles.font50, styles.textPink,{color:'#12c983'}]} type="FontAwesome5"></Icon>
                <View style={[styles.alignEnd]}>
                    <Text style={[styles.font40]}>{data.suppliers}</Text>
                    <Text style={[styles.font25, styles.textGray]}>Supplier</Text>
                </View>
            </View>
        </View>
    )
};

export default Sales;