import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import Loading from '../components/molecules/Loading';
import MyTabBar from '../components/molecules/MyTabBar';
import Feed from '../pages/Feed';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Merchant from '../pages/Merchant';
import Merchants from '../pages/Merchants';
import My from '../pages/My';
import Order from '../pages/Order';
import Product from '../pages/Product';
import Register from '../pages/Register';
import Search from '../pages/Search';
import SplashScreen from '../pages/SplashScreen';
import {authentication} from '../redux/action/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    EncryptedStorage.getItem('e-talaze_session')
      .then(token => {
        authentication(token)
          .then(res => {
            dispatch({
              type: 'GET_USER',
              payload: res.data,
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Beranda"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Feed" component={Feed} options={{headerShown: false}} />
      <Tab.Screen
        name="Transaksi"
        component={Order}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Saya" component={My} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Merchants"
        component={Merchants}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Merchant"
        component={Merchant}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
