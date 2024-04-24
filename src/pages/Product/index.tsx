import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons/faCartPlus';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {faMessage} from '@fortawesome/free-solid-svg-icons/faMessage';
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import {storeCart} from '../../redux/action/cart';
import {getProduct} from '../../redux/action/product';

function Product(): React.JSX.Element {
  type ParamList = {
    Params: {id: string};
  };

  const {params} = useRoute<RouteProp<ParamList, 'Params'>>();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(Object);
  const [quantity, setQuantity] = useState(0);

  const {product} = useSelector((state: any) => state.product);
  const {total_item} = useSelector((state: any) => state.totalItem);
  const {total_unread} = useSelector((state: any) => state.totalUnread);

  const dispatch = useDispatch();

  useEffect(() => {
    getProduct(params.id)
      .then(res => {
        dispatch({
          type: 'GET_PRODUCT',
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.id]);

  const btnCart = () => {
    setLoading(true);

    const form = {
      merchantId: product.merchantId,
      itemId: item.id,
      quantity,
    };

    EncryptedStorage.getItem('e-talaze_session')
      .then((token: any) => {
        storeCart(token, form, false)
          .then(res => {
            Alert.alert(res.message);
          })
          .catch(err => {
            if (err.message === 'validation failed') {
              Alert.alert('pilih varian terlebih dahulu');
            } else {
              Alert.alert(err.message);
            }
          });
      })
      .catch(err => Alert.alert(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  const btnDirectCart = () => {
    setLoading(true);

    const form = {
      merchantId: product.merchantId,
      itemId: item.id,
      quantity,
    };

    EncryptedStorage.getItem('e-talaze_session')
      .then(token => {
        storeCart(token, form, true)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            if (err.message === 'validation failed') {
              Alert.alert('pilih varian terlebih dahulu');
            } else {
              Alert.alert(err.message);
            }
          });
      })
      .catch(err => Alert.alert(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.page}>
      <View style={styles.bgLightenBlue}>
        <Gap height={10} />
        <View style={[styles.rowCenter, styles.spaceBetween, styles.pH]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={'#6b7c86'} />
          </TouchableOpacity>
          <View style={styles.rowCenter}>
            {total_item ? <Gap width={15} /> : <Gap width={20} />}
            <TouchableOpacity
              style={styles.justifyContentCenter}
              onPress={() => Alert.alert('cart')}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size={24}
                  color={'#6b7c86'}
                />
                {total_item ? (
                  <View style={styles.badgePosition}>
                    <View style={styles.badgeSearch}>
                      <Text style={[styles.number, styles.darkenBlue]}>
                        {total_item}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
            {total_item ? <Gap width={10} /> : <Gap width={20} />}
            <TouchableOpacity
              style={styles.justifyContentCenter}
              onPress={() => Alert.alert('message')}>
              <View style={styles.row}>
                <FontAwesomeIcon icon={faMessage} size={24} color={'#6b7c86'} />
                {total_unread ? (
                  <View style={styles.badgePosition}>
                    <View style={styles.badgeSearch}>
                      <Text style={[styles.number, styles.darkenBlue]}>
                        {total_unread}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={10} />
      </View>
      <ScrollView>
        <View style={styles.bgLightenBlue}>
          {Object.keys(item).length ? (
            <Image
              source={{uri: `https://${item.image}`}}
              style={styles.image}
            />
          ) : (
            <Image
              source={{uri: `https://${product.image}`}}
              style={styles.image}
            />
          )}
          <Gap height={10} />
          <View style={styles.pH}>
            <Gap width={10} />
            {item.name ? (
              <View style={styles.rowCenter}>
                <Text style={[styles.priceWithDiscount, styles.red]}>
                  {item.priceWithDiscount}
                </Text>
                <Gap width={5} />
                <Text style={[styles.price, styles.darkenBlue]}>
                  {item.price}
                </Text>
              </View>
            ) : null}
            <Text style={[styles.productName, styles.darkenBlue]}>
              {product.name} {item.name ? '-' : ''} {item.name}
            </Text>
            <Gap height={5} />
            <Text style={[styles.title, styles.darkenBlue]}>Pilih Varian</Text>
            <Gap height={10} />
            <View style={styles.wrap}>
              {product.Items?.map((value: any, index: number) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      setItem(value);
                      setQuantity(0);
                    }}>
                    <View
                      style={[
                        styles.badge,
                        item.id === value.id
                          ? styles.bgDarkenBlue
                          : styles.bgWhite,
                      ]}>
                      <Text
                        style={[
                          styles.badgeText,
                          item.id === value.id
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
            <Gap height={10} />
            <View style={styles.border} />
            <Gap height={10} />
            <View style={styles.spaceBetween}>
              <Text style={[styles.title, styles.darkenBlue]}>Kuantitas</Text>
              <View style={styles.rowCenter}>
                <TouchableOpacity
                  onPress={() =>
                    setQuantity(quantity > 0 ? quantity - 1 : quantity)
                  }>
                  <View style={[styles.badge, styles.bgWhite]}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      size={18}
                      color={'#6b7c86'}
                    />
                  </View>
                </TouchableOpacity>
                <Gap width={10} />
                <Text style={[styles.qty, styles.darkenBlue]}>{quantity}</Text>
                <Gap width={10} />
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                  <View style={[styles.badge, styles.bgWhite]}>
                    <FontAwesomeIcon
                      icon={faPlus}
                      size={18}
                      color={'#6b7c86'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Gap height={20} />
            <View style={styles.spaceBetween}>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => {}}>
                  <View style={[styles.badge, {backgroundColor: 'white'}]}>
                    <FontAwesomeIcon
                      icon={faMessage}
                      size={20}
                      color={'#6b7c86'}
                    />
                  </View>
                </TouchableOpacity>
                <Gap width={5} />
                <TouchableOpacity onPress={btnCart}>
                  <View style={[styles.badge, {backgroundColor: 'white'}]}>
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      size={20}
                      color={'#6b7c86'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={btnDirectCart}>
                <View style={[styles.badge, styles.bgWhite]}>
                  <Text style={[styles.badgeText, styles.darkenBlue]}>
                    PESAN LANGSUNG
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Gap height={10} />
          </View>
        </View>
        <Gap height={3.5} />
        <View style={styles.bgLightenBlue}>
          <Gap height={10} />
          <View style={styles.pH}>
            <Text style={[styles.title, styles.darkenBlue]}>Deskripsi</Text>
            <Gap height={10} />
            <Text>{product.description}</Text>
          </View>
          <Gap height={10} />
        </View>
        <Gap height={3.5} />
        <View style={[{flex: 1}, styles.bgLightenBlue]}>
          <Gap height={10} />
          <View style={styles.pH}>
            <Text style={[styles.title, styles.darkenBlue]}>
              Ulasan ({product.Reviews.length})
            </Text>
          </View>
          <Gap height={10} />
        </View>
      </ScrollView>
    </View>
  );
}
export default Product;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pH: {paddingHorizontal: 10},
  justifyContentCenter: {justifyContent: 'center'},
  row: {
    flexDirection: 'row',
  },
  badgePosition: {
    marginTop: -5,
    marginLeft: -9,
  },
  badgeSearch: {
    backgroundColor: 'white',
    paddingHorizontal: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d8e1e6',
    justifyContent: 'center',
  },
  number: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: 360,
    height: 360,
  },
  priceWithDiscount: {
    fontSize: 19,
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
  },
  price: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  wrap: {flexDirection: 'row', flexWrap: 'wrap'},
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
  qty: {
    fontSize: 16,
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
