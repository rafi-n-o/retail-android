import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons/faShoppingBasket';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Gap from '../../components/atoms/Gap';

function SplashScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('Login'));
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faShoppingBasket} size={32} color={'#6b7c86'} />
      <Gap width={10} />
      <Text style={styles.welcome}>E-Talaze</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f8f9',
  },
  welcome: {
    fontSize: 32,
    fontFamily: 'Poppins-Regular',
    color: '#6b7c86',
    textAlign: 'center',
  },
});
export default SplashScreen;
