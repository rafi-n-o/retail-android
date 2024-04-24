import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import Gap from '../../components/atoms/Gap';
import SearchBar from '../../components/molecules/SearchBar';
import {getTotalItem} from '../../redux/action/cart';
import {getMerchants} from '../../redux/action/merchant';
import {getTotalUnread} from '../../redux/action/merchantCustomerChat';

function Merchants(): React.JSX.Element {
  type ParamList = {
    Params: {needId: number};
  };

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();

  const [loading, setLoading] = useState(true);

  const {merchants} = useSelector((state: any) => state.merchants);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  useEffect(() => {
    EncryptedStorage.getItem('e-talaze_session')
      .then(token => {
        dispatch(getTotalItem(token));
        dispatch(getTotalUnread(token));
      })
      .then(() => {
        getMerchants(params.needId).then(res => {
          dispatch({
            type: 'GET_MERCHANTS',
            payload: res.data,
          });
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.needId]);

  const formSearch = (value: string) => {
    setLoading(true);
    getMerchants(params.needId, value)
      .then(res => {
        dispatch({
          type: 'GET_MERCHANTS',
          payload: res.data,
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={[styles.flex, styles.bgLightenBlue]}>
      <Gap height={5} />
      <SearchBar
        isBack={true}
        isPressable={false}
        placeholder={'Cari merchant...'}
        isFocus={false}
        formSearch={formSearch}
      />
      <Gap height={10} />
      <ScrollView style={[styles.pH]}>
        {merchants.map((value: any, index: any) => (
          <View key={index}>
            <TouchableOpacity
              style={[styles.card, styles.bgWhite, styles.rowCenter]}
              onPress={() =>
                navigation.navigate('Merchant', {
                  id: value.id,
                  needId: params.needId,
                })
              }>
              <Image
                source={{
                  uri: `https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.JPG`,
                }}
                style={styles.image}
              />
              <Gap width={10} />
              <Text style={[styles.merchantName, styles.darkenBlue]}>
                {value.name}
              </Text>
              <Text style={[styles.address, styles.darkenBlue]}>
                {value.address}
              </Text>
            </TouchableOpacity>
            <Gap height={5} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default Merchants;

const styles = StyleSheet.create({
  flex: {flex: 1},
  pH: {
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    borderColor: '#d8e1e6',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d8e1e6',
  },
  merchantName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  address: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  darkenBlue: {color: '#6b7c86'},
  white: {color: 'white'},
  red: {color: '#e53935'},
  bgLightenBlue: {backgroundColor: '#f4f8f9'},
  bgDarkenBlue: {backgroundColor: '#6b7c86'},
  bgWhite: {
    backgroundColor: 'white',
  },
});
