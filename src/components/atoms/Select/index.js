import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Select = ({
  label = '',
  data,
  isRegency = false,
  isDistrict = false,
  isVillage = false,
  ...rest
}) => {
  return (
    <View>
      {label.length ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.input}>
        <Picker mode={'dialog'} {...rest}>
          {(() => {
            if (isDistrict) {
              return <Picker.Item label={'Pilih Kecamatan'} value={''} />;
            }
            if (isVillage) {
              return (
                <Picker.Item label={'Pilih Kelurahan / Desa'} value={''} />
              );
            }
          })()}
          {(() => {
            if (isRegency) {
              return data.map((value, index) => {
                return (
                  <Picker.Item
                    label={value.label}
                    value={JSON.stringify(value)}
                    key={index}
                  />
                );
              });
            } else if (isDistrict) {
              return data.map((value, index) => {
                return (
                  <Picker.Item
                    label={value.name}
                    value={JSON.stringify(value)}
                    key={index}
                  />
                );
              });
            } else if (isVillage) {
              return data.map((value, index) => {
                return (
                  <Picker.Item
                    label={value.name}
                    value={JSON.stringify(value)}
                    key={index}
                  />
                );
              });
            } else {
              return data.map((value, index) => {
                return (
                  <Picker.Item
                    label={value.label}
                    value={value.value}
                    key={index}
                  />
                );
              });
            }
          })()}
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202'},
  input: {
    backgroundColor: 'white',
    borderColor: '#020202',
    borderRadius: 5,
  },
});
