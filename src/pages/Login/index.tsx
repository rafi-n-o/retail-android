import {
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import TextInput from '../../components/atoms/TextInput';
import Validation from '../../components/atoms/Validation';
import Loading from '../../components/molecules/Loading';
import {authentication, storeLogin} from '../../redux/action/auth';

function Login(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [validation, setValidation] = useState([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    EncryptedStorage.getItem('e-talaze_session').then(token => {
      authentication(token)
        .then(res => {
          if (res.data) {
            navigation.dispatch(StackActions.replace('MainApp'));
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  const btnLogin = () => {
    setLoading(true);

    const form = {
      phone,
      pin,
    };

    storeLogin(form)
      .then(res => {
        Alert.alert(res.message);
        EncryptedStorage.setItem('e-talaze_session', res.data).then(() => {
          navigation.dispatch(StackActions.replace('MainApp'));
        });
      })
      .catch(err => {
        if (err.message === 'validation failed') {
          setValidation(err.data);
        } else {
          Alert.alert(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={styles.title}>Sign In</Text>
          <Gap height={25} />
          <TextInput
            label={'No. Hp / Whatsapp'}
            placeholder={'Masukkan No. Hp'}
            value={phone}
            onChangeText={(value: string) => setPhone(value)}
          />
          {validation.map((value: any, index) =>
            value.field === 'phone' ? (
              <Validation message={value.message} key={index} />
            ) : null,
          )}
          <Gap height={10} />
          <TextInput
            label={'Pin'}
            placeholder={'Masukkan Pin'}
            value={pin}
            onChangeText={(value: string) => setPin(value)}
            secureTextEntry
          />
          {validation.map((value: any, index) =>
            value.field === 'pin' ? (
              <Validation message={value.message} key={index} />
            ) : null,
          )}
          <Gap height={25} />
          <Button text={'Masuk'} onPress={btnLogin} />
          <Gap height={15} />
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(StackActions.replace('Register'));
            }}>
            <Text style={styles.register}>Belum punya akun? Klik disini!</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#f4f8f9',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Poppins-Regular',
    color: '#6b7c86',
  },
  register: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6b7c86',
  },
});
