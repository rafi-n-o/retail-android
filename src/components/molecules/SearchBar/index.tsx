import {faCartShopping} from '@fortawesome/free-solid-svg-icons/faCartShopping';
import {faMessage} from '@fortawesome/free-solid-svg-icons/faMessage';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {PropsWithChildren, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Gap from '../../atoms/Gap';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TextInput from '../../atoms/TextInput';

type SectionProps = PropsWithChildren<{
  isBack: boolean;
  isPressable: boolean;
  placeholder: string;
  isFocus: boolean;
  formSearch: any;
}>;

function SearchBar({
  isBack,
  isPressable,
  placeholder,
  isFocus,
  formSearch,
}: SectionProps): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [search, setSearch] = useState('');

  const {total_item} = useSelector((state: any) => state.totalItem);
  const {total_unread} = useSelector((state: any) => state.totalUnread);

  return (
    <View style={[styles.rowCenter, styles.justifyContentCenter]}>
      {isBack ? (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={'#6b7c86'} />
          </TouchableOpacity>
          <Gap width={10} />
        </>
      ) : null}
      {isPressable ? (
        <Pressable
          style={styles.row}
          onPress={() => navigation.navigate('Search')}>
          <View style={[styles.inputSearch, styles.rowCenter]}>
            <Gap width={5} />
            <Text style={[styles.darkenBlue, styles.wrap]}>{placeholder}</Text>
          </View>
          <View style={styles.iconSearch}>
            <FontAwesomeIcon icon={faSearch} size={24} color={'#6b7c86'} />
          </View>
        </Pressable>
      ) : (
        <>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#6b7c86'}
            style={styles.inputSearch}
            autoFocus={isFocus}
            value={search}
            onChangeText={(value: string) => {
              formSearch(value);
              setSearch(value);
            }}
          />
          <View style={styles.iconSearch}>
            <FontAwesomeIcon icon={faSearch} size={22} color={'#6b7c86'} />
          </View>
        </>
      )}
      {total_item ? <Gap width={15} /> : <Gap width={20} />}
      <TouchableOpacity
        style={styles.justifyContentCenter}
        onPress={() => Alert.alert('cart')}>
        <View style={styles.row}>
          <FontAwesomeIcon icon={faCartShopping} size={24} color={'#6b7c86'} />
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
  );
}
export default SearchBar;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyContentCenter: {justifyContent: 'center'},
  row: {
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  inputSearch: {
    color: '#6b7c86',
    height: 38,
    width: 180,
    backgroundColor: 'white',
    borderColor: '#6b7c86',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconSearch: {
    justifyContent: 'center',
    paddingRight: 5,
    height: 38,
    backgroundColor: 'white',
    borderColor: '#6b7c86',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
  darkenBlue: {color: '#6b7c86'},
  white: {color: 'white'},
  red: {color: '#e53935'},
  bgLightenBlue: {backgroundColor: '#f4f8f9'},
  bgDarkenBlue: {backgroundColor: '#6b7c86'},
  bgWhite: {
    backgroundColor: 'white',
  },
});
