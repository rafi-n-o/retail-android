import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import Loading from '../../components/molecules/Loading';

function My(): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  const {profile} = useSelector((state: any) => state.profile);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  const btnLogout = () => {
    setLoading(true);
    EncryptedStorage.removeItem('e-talaze_session')
      .then(() => {
        dispatch({
          type: 'GET_USER',
          payload: {},
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text>My Page</Text>
    </View>
  );
}
export default My;
