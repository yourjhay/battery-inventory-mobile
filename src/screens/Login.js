import React, { Component, useState } from 'react';
import { View, Image } from 'react-native';
import {   
  Container,
  Input,
  Button,
  Form,
  Item,
  Text,
  Label,
  Icon} from 'native-base';
import { styles } from '../styles/Style';
import { loginUser } from '../utils/Api';
import { setSession, getSession } from '../utils/SessionStorage';
import { useDispatch } from 'react-redux';
import * as TermsAction from '../redux/actions';


const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const submitLogin = async () => {
    setErrorMessage(null)
    let data = {
      username: username,
      password: password
    }
    await loginUser(data).then(res => {
      dispatch(TermsAction.setTermsState(res));
      if(remember) {
        setSession('user', res);
      }
    }).catch(err=>{
      console.log(err.response.data); 
      setErrorMessage(err.response.data.message)
    })
  }

  const fetchSession = async() => {
    const session = await getSession('user');
   console.log('user',session)
  }
  
  React.useEffect(() => {
      fetchSession();
  },[]);

  return (
    <Container>
    <View style={[styles.flex1, styles.p1, styles.justifyCenter]}>
    <Form>
            <View style={[styles.mB3]}>
              <Text style={[styles.textCenter, styles.font20]}>Battery Inventory</Text>
            </View>
            <View style={[styles.mB3]}>
              <Text style={[styles.textCenter, styles.textDanger]}>{errorMessage}</Text>
            </View>
            <View>
              <Label style={[styles.font13, styles.textGray]}>Username</Label>
              <Item regular style={[styles.rounded, styles.mTHalf]}>
                <Input style={[styles.headerInput, styles.font14]} onChangeText={(value) => { setUsername(value); setErrorMessage(''); }} />
              </Item>
            </View>
            <View style={styles.mT1}>
              <Label style={[styles.font13, styles.textGray]}>Password</Label>
              <Item regular style={[styles.rounded, styles.mTHalf]}>
                <Input style={[styles.headerInput, styles.font14]} secureTextEntry={viewPassword} onChangeText={(value) => { setPassword(value); setErrorMessage(''); }} />
                <Icon
                  active
                  style={[styles.textDanger]}
                  name={viewPassword ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setViewPassword(!viewPassword)}
                />
              </Item>
            </View>
            <View style={[styles.flexRow, styles.justifySpaceBetween, styles.mT1]}>
              
              
            </View>
            <Button disabled={isFetching} onPress={() => submitLogin()} style={[styles.mT2, styles.mB1, styles.rounded]} block danger>
              {isFetching ?
                <Text style={[styles.textWhite, styles.font15]}>Please wait...</Text>
                :
                <Text style={[styles.textWhite, styles.font15]}>Log in</Text>
              }
              </Button>
          </Form>
    </View>
  </Container>
  )
};

export default Login;