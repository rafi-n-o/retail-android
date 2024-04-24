import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import Map from '../../components/atoms/Map';
import Select from '../../components/atoms/Select';
import TextInput from '../../components/atoms/TextInput';
import Validation from '../../components/atoms/Validation';
import {storeRegister} from '../../redux/action/auth';
import {getWilayah} from '../../redux/action/wilayah';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/molecules/Loading';
import {
  ParamListBase,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

function Register(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('JAWA BARAT');
  const [regency, setRegency] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [pin, setPin] = useState('');
  const [pinConfirmation, setPinConfirmation] = useState('');
  const [validation, setValidation] = useState([]);

  const {districts} = useSelector((state: any) => state.districts);
  const {villages} = useSelector((state: any) => state.villages);

  const dispatch = useDispatch();

  const genders = [
    {label: 'Pilih Jenis Kelamin', value: ''},
    {
      label: 'Laki-Laki',
      value: 'M',
    },
    {
      label: 'Perempuan',
      value: 'W',
    },
  ];

  const regencies = [
    {
      label: 'Pilih Kab. / Kota',
      value: null,
    },
    {
      label: 'KABUPATEN BANDUNG',
      value: 3204,
    },
    {
      label: 'KOTA BANDUNG',
      value: 3273,
    },
  ];

  const getDistricts = (value: any) => {
    setLoading(true);
    getWilayah('', value.value)
      .then(res => {
        dispatch({
          type: 'GET_DISTRICTS',
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

  const getVillages = (value: any) => {
    setLoading(true);
    getWilayah('', '', value.id)
      .then(res => {
        dispatch({
          type: 'GET_VILLAGES',
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

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const btnRegister = () => {
    setLoading(true);

    const form = {
      name,
      email,
      phone,
      gender,
      address,
      province,
      regency: regency ? JSON.parse(regency).label : '',
      district: district ? JSON.parse(district).name : '',
      village: village ? JSON.parse(village).name : '',
      zipCode,
      latitude,
      longitude,
      pin,
      pin_confirmation: pinConfirmation,
    };

    storeRegister(form)
      .then(res => {
        Alert.alert(res.message);
        navigation.dispatch(StackActions.replace('Login'));
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

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <TextInput
        label={'Nama Lengkap'}
        placeholder={'Masukkan nama lengkap'}
        value={name}
        onChangeText={(value: string) => setName(value)}
      />
      {validation.map((value: any, index) =>
        value.field === 'name' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <TextInput
        label={'Email (Opsional)'}
        placeholder={'Masukkan alamat email'}
        value={email}
        onChangeText={(value: string) => setEmail(value)}
      />
      <Gap height={10} />
      <TextInput
        label={'No. Telp / WhatsApp'}
        placeholder={'Masukkan No. Telp / WhatsApp'}
        value={phone}
        onChangeText={(value: string) => setPhone(value)}
      />
      {validation.map((value: any, index) =>
        value.field === 'phone' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <Select
        label={'Jenis Kelamin'}
        data={genders}
        selectedValue={gender}
        onValueChange={(itemValue: string, itemIndex: number) => {
          setGender(itemValue);
        }}
      />
      {validation.map((value: any, index) =>
        value.field === 'gender' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <TextInput
        label={'Alamat'}
        placeholder={'Masukkan alamat'}
        value={address}
        onChangeText={(value: string) => setAddress(value)}
      />
      {validation.map((value: any, index) =>
        value.field === 'address' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <Select
        label={'Kab. / Kota'}
        data={regencies}
        isRegency={true}
        selectedValue={regency}
        onValueChange={(itemValue: string, itemIndex: number) => {
          setRegency(itemValue);
          getDistricts(JSON.parse(itemValue));
        }}
      />
      {validation.map((value: any, index) =>
        value.field === 'regency' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <Select
        label={'Kecamatan'}
        data={districts}
        isDistrict={true}
        selectedValue={district}
        onValueChange={(itemValue: string, itemIndex: number) => {
          setDistrict(itemValue);
          getVillages(JSON.parse(itemValue));
        }}
      />
      {validation.map((value: any, index) =>
        value.field === 'district' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <Select
        label={'Kelurahan / Desa'}
        data={villages}
        isVillage={true}
        selectedValue={village}
        onValueChange={(itemValue: string, itemIndex: number) => {
          setVillage(itemValue);
        }}
      />
      {validation.map((value: any, index) =>
        value.field === 'village' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <TextInput
        label={'Kode Pos (Opsional)'}
        placeholder={'Masukkan kode pos'}
        value={zipCode}
        onChangeText={(value: string) => setZipCode(value)}
      />
      <Map
        label={'Titik alamat'}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      />
      <TextInput
        label={'Pin (6 Digit Angka)'}
        placeholder={'Masukkan pin'}
        value={pin}
        onChangeText={(value: string) => setPin(value)}
        secureTextEntry
      />
      {validation.map((value: any, index) =>
        value.field === 'pin' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <TextInput
        label={'Konfirmasi Pin (6 Digit Angka)'}
        placeholder={'Masukkan konfirmasi pin'}
        value={pinConfirmation}
        onChangeText={(value: string) => setPinConfirmation(value)}
        secureTextEntry
      />
      {validation.map((value: any, index) =>
        value.field === 'pin_confirmation' ? (
          <Validation message={value.message} key={index} />
        ) : null,
      )}
      <Gap height={10} />
      <Button text={'Registrasi'} onPress={btnRegister} />
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(StackActions.replace('Login'));
        }}>
        <Text>Sudah punya akun? Klik disini!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Register;

const styles = StyleSheet.create({
  page: {flex: 1},
});
