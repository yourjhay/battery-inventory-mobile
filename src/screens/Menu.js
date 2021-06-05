import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Container, Card } from 'native-base';
import { styles } from '../styles/Style';
import { isDarkMode} from '../utils';
import { setSession, getSession, removeSession } from '../utils/SessionStorage';
import { Icon } from 'native-base';
import { useDispatch } from 'react-redux';
import * as TermsAction from '../redux/actions';


const Menu = () => {
  const dispatch = useDispatch();
   const [user, setUser] = useState({
       username:'',
       firstname:'',
       middlename:'',
       lastname: '',
       email: ''
   });

    useEffect(() => {
        fetchSession();
    }, [])
    
    const fetchSession = async() => {
        const session = await getSession('user');
        setUser(session);
    }
  const Logout = () => {
    removeSession('user');
    dispatch(TermsAction.setTermsState(false));
  }

    return (
        <View style={[styles.flex1, styles.flexCol, styles.p1]}>
            <Card style={[styles.p1]}>
                <Text style={[styles.textBold, styles.textCenter, styles.font30]}>{user?.username}</Text>
                <Text style={[styles.textGray, styles.textCenter, styles.font18]}>{user?.email}</Text>
                <View style={[styles.mT1, styles.flex, styles.flexRow, styles.justifySpaceBetween]}>
                    <Text style={[styles.font20, styles.textGray]}>Firstname: </Text>
                    <Text style={[styles.font20]}>{user?.firstname}</Text>
                </View>
                <View style={[styles.flex, styles.flexRow, styles.justifySpaceBetween]}>
                    <Text style={[styles.font20, styles.textGray]}>Middlename: </Text>
                    <Text style={[styles.font20]}>{user?.middlename}</Text>
                </View>
                <View style={[ styles.flex, styles.flexRow, styles.justifySpaceBetween]}>
                    <Text style={[styles.font20, styles.textGray]}>Lastname: </Text>
                    <Text style={[styles.font20]}>{user?.lastname}</Text>
                </View>
                <View style={[ styles.flex, styles.flexRow, styles.justifySpaceBetween]}>
                    <Text style={[styles.font20, styles.textGray]}>Mobile: </Text>
                    <Text style={[styles.font20]}>{user?.mobile}</Text>
                </View>
            </Card>
            <TouchableOpacity style={styles.mT1} onPress={()=>Logout()}>
                <Card style={[styles.flex, styles.flexRow, styles.p1, styles.alignCenter, styles.rounded]}>
                    <Icon name="logout" style={[styles.font30, styles.textBlue]} type="AntDesign"></Icon>
                    <Text style={[styles.mL1, styles.textGray, styles.font20]}> Logout </Text>
                </Card>
            </TouchableOpacity>
        </View> 
    )
};

export default Menu;