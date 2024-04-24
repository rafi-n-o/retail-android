import {
  ParamListBase,
  useIsFocused,
  useNavigation,
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
import {getTotalUnread} from '../../redux/action/merchantCustomerChat';
import {getNeeds} from '../../redux/action/need';

function Home(): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  const {needs} = useSelector((state: any) => state.needs);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  const isVisible = useIsFocused();

  useEffect(() => {
    EncryptedStorage.getItem('e-talaze_session')
      .then(token => {
        dispatch(getTotalItem(token));
        dispatch(getTotalUnread(token));
      })
      .then(() => {
        getNeeds().then(res => {
          dispatch({type: 'GET_NEEDS', payload: res.data});
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    if (isVisible) {
      EncryptedStorage.getItem('e-talaze_session')
        .then(token => {
          dispatch(getTotalItem(token));
          dispatch(getTotalUnread(token));
        })
        .then(() => {
          getNeeds().then(res => {
            dispatch({type: 'GET_NEEDS', payload: res.data});
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isVisible]);

  return (
    <View style={[styles.bgLightenBlue, styles.flex]}>
      <Gap height={5} />
      <SearchBar
        isBack={false}
        isPressable={true}
        placeholder={'Cari merchant, produk, da...'}
        isFocus={false}
        formSearch={null}
      />
      {loading ? (
        <View style={styles.pH}>
          <Loading />
        </View>
      ) : (
        <>
          <Gap height={10} />
          <View style={styles.pH}>
            <View style={styles.border}></View>
            <Gap height={5} />
            <View style={[styles.rowCenter, styles.spaceBetween]}>
              <Text style={[styles.title, styles.darkenBlue]}>Kategori</Text>
              <TouchableOpacity>
                <Text style={[styles.title, styles.darkenBlue]}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Gap height={10} />
          <View>
            <ScrollView horizontal>
              {needs.map((value: any, index: number) => (
                <View style={styles.containerCard} key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Merchants', {needId: value.id})
                    }>
                    <View style={styles.card}>
                      <Image
                        source={{uri: `https://${value.image}`}}
                        style={styles.image}
                      />
                      <Gap height={5} />
                      <Text style={[styles.name, styles.darkenBlue]}>
                        {value.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <Gap height={15} />
          <View style={styles.pH}>
            <View style={styles.border}></View>
            <Gap height={5} />
            <View style={[styles.rowCenter, styles.spaceBetween]}>
              <Text style={[styles.title, styles.darkenBlue]}>Terdekat</Text>
              <TouchableOpacity>
                <Text style={[styles.title, styles.darkenBlue]}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  flex: {flex: 1},
  pH: {paddingHorizontal: 10},
  border: {
    borderWidth: 1,
    borderColor: 'white',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {justifyContent: 'space-between'},
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  containerCard: {
    width: 150,
    paddingHorizontal: 2.5,
    alignSelf: 'center',
  },
  card: {
    borderColor: '#d8e1e6',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d8e1e6',
  },
  name: {
    textAlign: 'center',
    fontSize: 14,
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
