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
import Loading from '../../components/molecules/Loading';
import SearchBar from '../../components/molecules/SearchBar';
import {getTotalItem} from '../../redux/action/cart';
import {getFamilies} from '../../redux/action/family';
import {getMerchant} from '../../redux/action/merchant';
import {getTotalUnread} from '../../redux/action/merchantCustomerChat';
import {getNeeds} from '../../redux/action/need';
import {getProducts} from '../../redux/action/product';

function Merchant(): React.JSX.Element {
  type ParamList = {
    Params: {id: number; needId: number};
  };

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();

  const [loading, setLoading] = useState(true);
  const [needId, setNeedId] = useState(params.needId);
  const [familyId, setFamilyId] = useState('');
  const [textSearch, setTextSearch] = useState('');

  const {merchant} = useSelector((state: any) => state.merchant);
  const {products} = useSelector((state: any) => state.products);
  const {needs} = useSelector((state: any) => state.needs);
  const {families} = useSelector((state: any) => state.families);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  useEffect(() => {
    getMerchant(params.id)
      .then(res => {
        dispatch({
          type: 'GET_MERCHANT',
          payload: res.data,
        });
      })
      .then(() => {
        getProducts(params.id).then(res => {
          dispatch({
            type: 'GET_PRODUCTS',
            payload: res.data,
          });
        });
      })
      .then(() => {
        getNeeds(params.id.toString()).then(res => {
          dispatch({
            type: 'GET_NEEDS',
            payload: res.data,
          });
          if (params.needId) {
            getFamilies(params.id.toString(), params.needId.toString()).then(
              res => {
                dispatch({
                  type: 'GET_FAMILIES',
                  payload: res.data,
                });
              },
            );
          }
        });
      })
      .then(() => {
        EncryptedStorage.getItem('e-talaze_session').then(token => {
          dispatch(getTotalItem(token));
          dispatch(getTotalUnread(token));
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id, params.needId]);

  const btnNeed = (value: string) => {
    setLoading(true);
    getProducts(params.id, value, '', textSearch)
      .then(res => {
        dispatch({
          type: 'GET_PRODUCTS',
          payload: res.data,
        });
      })
      .then(() => {
        getFamilies(params.id.toString(), value).then((res: any) => {
          dispatch({
            type: 'GET_FAMILIES',
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
  };

  const btnFamily = (value: string) => {
    setLoading(true);
    getProducts(params.id.toString(), needId.toString(), value, textSearch)
      .then(res => {
        dispatch({
          type: 'GET_PRODUCTS',
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

  const formSearch = (value: string) => {
    setLoading(true);
    setTextSearch(value);
    getProducts(params.id.toString(), needId.toString(), familyId, value)
      .then(res => {
        dispatch({
          type: 'GET_PRODUCTS',
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
    <View style={styles.flex}>
      <View style={[styles.bgLightenBlue]}>
        <Gap height={5} />
        <SearchBar
          isBack={true}
          isPressable={false}
          placeholder={'Cari produk...'}
          isFocus={false}
          formSearch={formSearch}
        />
        <Gap height={10} />
        <View style={[styles.pH, styles.rowCenter]}>
          <Image
            source={{
              uri: `https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.JPG`,
            }}
            style={styles.merchantImage}
          />
          <Gap width={10} />
          <View style={styles.flexShrink}>
            <Text style={[styles.merchantName, styles.darkenBlue]}>
              {merchant.name}
            </Text>
            <Gap height={5} />
            <View style={styles.rowCenter}>
              <Text style={[styles.address, styles.darkenBlue]}>
                {merchant.address}, {merchant.province}, {merchant.regency},{' '}
                {merchant.district}, {merchant.village}, {merchant.zipCode}
              </Text>
            </View>
          </View>
        </View>
        <Gap height={7.5} />
      </View>
      <ScrollView style={[styles.flex, styles.bgLightenBlue]}>
        <Gap height={5} />
        <View style={styles.pH}>
          <View style={[styles.rowCenter, styles.wrap]}>
            {needs.map((value: any, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setNeedId(value.id);
                    setFamilyId('');
                    btnNeed(value.id);
                  }}>
                  <View
                    style={[
                      styles.badge,
                      needId === value.id
                        ? styles.bgDarkenBlue
                        : styles.bgWhite,
                    ]}>
                    <Text
                      style={[
                        styles.badgeText,
                        needId === value.id ? styles.white : styles.darkenBlue,
                      ]}>
                      {value.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Gap width={2.5} />
              </View>
            ))}
          </View>
          {families.length ? <Gap height={2.5} /> : null}
          <View style={[styles.rowCenter, styles.wrap]}>
            {families.map((value: any, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setFamilyId(value.id);
                    btnFamily(value.id);
                  }}>
                  <View
                    style={[
                      styles.badge,
                      familyId === value.id
                        ? styles.bgDarkenBlue
                        : styles.bgWhite,
                    ]}>
                    <Text
                      style={[
                        styles.badgeText,
                        familyId === value.id
                          ? styles.white
                          : styles.darkenBlue,
                      ]}>
                      {value.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Gap width={2.5} />
              </View>
            ))}
          </View>
          <Gap height={7.5} />
          <View style={styles.border}></View>
          <Gap height={10} />
          {loading ? (
            <Loading />
          ) : (
            products.map((value: any, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Product', {id: value.id});
                  }}>
                  <View style={[styles.card, styles.bgWhite, styles.rowCenter]}>
                    <Image
                      source={{uri: `https://${value.image}`}}
                      style={styles.image}
                    />
                    <Gap width={10} />
                    <View>
                      <Text style={[styles.productName, styles.darkenBlue]}>
                        {value.name}
                      </Text>
                      <Gap height={5} />
                      <Text style={[styles.price, styles.red]}>
                        {value.price}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <Gap height={5} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
export default Merchant;

const styles = StyleSheet.create({
  flex: {flex: 1},
  pH: {paddingHorizontal: 10},
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d8e1e6',
  },
  flexShrink: {
    flexShrink: 1,
  },
  merchantName: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  address: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  wrap: {
    flexWrap: 'wrap',
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
  border: {
    borderWidth: 1,
    borderColor: 'white',
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
