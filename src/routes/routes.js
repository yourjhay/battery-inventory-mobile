import React, { useState } from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import { colors } from '../styles/Style';
import Login from '../screens/Login';

import Product from '../screens/Products';
import Supplier from '../screens/Supplier';
import Sales from '../screens/Sales';
import Menu from '../screens/Menu';
import { useSelector } from 'react-redux';
import { setSession, getSession } from '../utils/SessionStorage';
import { useDispatch } from 'react-redux';
import * as TermsAction from '../redux/actions';


const Tab         = createBottomTabNavigator();
const Stack       = createStackNavigator();
const AppStack    = createStackNavigator();
const AuthStack   = createStackNavigator();

const authScreen = [
    {method: 'LoginStackScreen', component: Login, name: 'Login', title: 'Login', fontSize: 30}
];

const AuthScreens = () => (
    <AuthStack.Navigator>
        {authScreen.map((authScreen, index) => (
            <Stack.Screen 
                key={index}
                name={authScreen.name} component={authScreen.component} 
                options={({ navigation }) => ({
                    headerShown: false,
                })}
            />
        ))}
    </AuthStack.Navigator>
);

const screens = [
    {method: 'SalesStackScreen', component: Sales, name: 'Sales', title: 'Dashboard', fontSize: 30, subScreens: []},
    {method: 'ProductStackScreen', component: Product, name: 'Products', title: 'Products', fontSize: 30, subScreens: []},
    {method: 'SupplierStackScreen', component: Supplier, name: 'Suppliers', title: 'Suppliers', fontSize: 30, subScreens: []},
    {method: 'MenuStackScreen', component: Menu, name: 'Menu', title: 'Account', fontSize: 30, subScreens: []},
];

const tabScreens = {};

screens.forEach(screen => {
    tabScreens[screen.method] = () => {

        return(
            <AppStack.Navigator
                screenOptions={{headerTitleAlign: 'center'}}
            >
                <Stack.Screen 
                    name={screen.name}
                    component={screen.component}
                    options={({ route }) => ({ 
                        title: screen.title,
                        headerStyle: {
                            backgroundColor: colors.primaryColor,
                        },
                        headerTitleStyle: {
                            color: 'white'
                        }
                    })}
                />
                {screen.subScreens.length > 0 && 
                screen.subScreens.map((subScreen,index) => {
                    return (
                        <Stack.Screen
                        key={index}
                        name={subScreen.name}
                        component={subScreen.component}
                        options={({ navigation, route }) => ({ 
                            title: subScreen.title,
                            headerStyle: {
                                backgroundColor: colors.primaryColor,
                            },
                            headerTitleContainerStyle: {
                                width:'70%',
                                alignItems:'center'
                            },
                            headerTitleStyle: {
                                color: 'white',
                            },
                            headerBackTitleVisible: false,
                            headerTintColor: '#fff',
                            headerLeft: (props) => (
                                <HeaderBackButton
                                    {...props}
                                    onPress={() => navigation.goBack(null)}
                                />
                            )
                        })}
                        />
                    );
                })}
            </AppStack.Navigator>
        );
    }
});

const routes = [
    {name: 'Sales', component: tabScreens.SalesStackScreen, iconName: 'dollar', type: 'FontAwesome'},
    {name: 'Products', component: tabScreens.ProductStackScreen, iconName: 'cart-minus', type: 'MaterialCommunityIcons'},
    {name: 'Suppliers', component: tabScreens.SupplierStackScreen, iconName: 'account', type: 'MaterialCommunityIcons'},
    {name: 'Menu', component: tabScreens.MenuStackScreen, iconName: 'menu', type: 'MaterialCommunityIcons'},

];

const AppScreens = () => {

    const [badge, setBadge] = React.useState(0);


    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size = 18 }) => {
                let icon = routes.find(icon => icon.name === route.name);
                return <Icon name={icon.iconName} style={{fontSize: size, color: color}} type={icon.type}/>;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#176e97',
                inactiveTintColor: 'gray',
                showLabel: false
            }}
        >
            {routes.map((route, index) => (
                <Tab.Screen
                    key={index}
                    name={route.name}
                    component={route.component}
                    options={{
                        unmountOnBlur: true,
                        tabBarBadge: null
                    }}                    
                />
            ))}
        </Tab.Navigator>
    );
}



const RootStack = () => {
    const dispatch = useDispatch();
    const [terms, setTerms] = React.useState(false);
    const [session, setSession] = useState(false);
    const fetchSession = async() => {
        const session = await getSession('user');
        setTerms(session);
        console.warn('user',session)
    }   

    React.useEffect(() => {
       fetchSession()
    }, [])

    const token = useSelector(state => state.termsReducer.isTermsAccept);

    return (
        <NavigationContainer ref={navigationRef}>
            {token ? (<AppScreens options={{animationEnabled: false}} />) : (<AuthScreens options={{animationEnabled: false}}/>)}
        </NavigationContainer>
    )
}

  export default RootStack;