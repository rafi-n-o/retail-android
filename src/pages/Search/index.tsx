import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import Gap from '../../components/atoms/Gap';
import Loading from '../../components/molecules/Loading';
import SearchBar from '../../components/molecules/SearchBar';
import {getTotalItem} from '../../redux/action/cart';
import {getTotalUnread} from '../../redux/action/merchantCustomerChat';
import {getSearch} from '../../redux/action/search';

function Search(): React.JSX.Element {
  const [loading, setLoading] = useState(true);
  const [by, setBy] = useState('merchant');
  const [textSearch, setTextSearch] = useState('');

  const {search} = useSelector((state: any) => state.search);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  useEffect(() => {
    EncryptedStorage.getItem('e-talaze_session')
      .then(token => {
        dispatch(getTotalItem(token));
        dispatch(getTotalUnread(token));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formSearch = (value: string) => {
    setLoading(true);
    setTextSearch(value);
    getSearch(by, value)
      .then(res => {
        dispatch({
          type: 'GET_SEARCH',
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const badgeSearch = (value: string) => {
    setLoading(true);
    getSearch(value, textSearch)
      .then(res => {
        dispatch({
          type: 'GET_SEARCH',
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={[styles.bgLightenBlue, styles.flex]}>
      <Gap height={5} />
      <SearchBar
        isBack={true}
        isPressable={false}
        placeholder={'Cari merchant, produk, da...'}
        isFocus={true}
        formSearch={formSearch}
      />
      <Gap height={10} />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.pH}>
          {!textSearch ? (
            <>
              <View style={styles.rowCenter}>
                <View style={styles.badge}>
                  <Text style={[styles.badgeText, styles.darkenBlue]}>
                    martabak
                  </Text>
                </View>
                <Gap width={2.5} />
                <View style={styles.badge}>
                  <Text style={[styles.badgeText, styles.darkenBlue]}>
                    cosrx
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.row}>
              <ScrollView horizontal>
                <Pressable
                  onPress={() => {
                    setBy('merchant');
                    badgeSearch('merchant');
                  }}
                  style={
                    by === 'merchant'
                      ? [styles.badge, styles.bgDarkenBlue]
                      : [styles.badge, styles.bgWhite]
                  }>
                  <Text
                    style={
                      by === 'merchant'
                        ? [styles.badgeText, styles.white]
                        : [styles.badgeText, styles.darkenBlue]
                    }>
                    Merchant
                  </Text>
                </Pressable>
                <Gap width={2.5} />
                <Pressable
                  onPress={() => {
                    setBy('food');
                    badgeSearch('food');
                  }}
                  style={
                    by === 'food'
                      ? [styles.badge, styles.bgDarkenBlue]
                      : [styles.badge, styles.bgWhite]
                  }>
                  <Text
                    style={
                      by === 'food'
                        ? [styles.badgeText, styles.white]
                        : [styles.badgeText, styles.darkenBlue]
                    }>
                    Makanan & Minuman
                  </Text>
                </Pressable>
                <Gap width={2.5} />
                <Pressable
                  onPress={() => {
                    setBy('product');
                    badgeSearch('product');
                  }}
                  style={
                    by === 'product'
                      ? [styles.badge, styles.bgDarkenBlue]
                      : [styles.badge, styles.bgWhite]
                  }>
                  <Text
                    style={
                      by === 'product'
                        ? [styles.badgeText, styles.white]
                        : [styles.badgeText, styles.darkenBlue]
                    }>
                    Produk
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          )}
          <Gap height={10} />
          <ScrollView>
            {search.map((value: any, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    if (by === 'merchant') {
                      dispatch({type: 'GET_FAMILIES', payload: []});
                      navigation.navigate('Merchant', {id: value.id});
                    }
                    if (by === 'food' || by === 'product') {
                      navigation.navigate('Product', {id: value.id});
                    }
                  }}>
                  <View style={[styles.card, styles.bgWhite, styles.rowCenter]}>
                    <Image
                      source={{
                        uri: `https://${value.image}`,
                      }}
                      style={styles.image}
                    />
                    <Gap width={10} />
                    {by === 'merchant' ? (
                      <View>
                        <Text style={[styles.merchantName, styles.darkenBlue]}>
                          {value.name}
                        </Text>
                        <Text style={[styles.address, styles.darkenBlue]}>
                          {value.address}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text style={[styles.productName, styles.darkenBlue]}>
                          {value.name}
                        </Text>
                        <Text style={[styles.price, styles.red]}>
                          {value.price}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                <Gap height={5} />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
export default Search;

const styles = StyleSheet.create({
  flex: {flex: 1},
  pH: {paddingHorizontal: 10},
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#d8e1e6',
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'row',
    borderColor: '#d8e1e6',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
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
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: 13,
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
