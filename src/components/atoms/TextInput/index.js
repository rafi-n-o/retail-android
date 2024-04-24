import React from 'react';
import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';
import Gap from '../Gap';

const TextInput = ({label = '', placeholder, ...rest}) => {
  return (
    <View>
      {label.length ? <Text style={styles.label}>{label}</Text> : null}
      {label.length ? <Gap height={5} /> : null}
      <TextInputRN
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'#6b7c86'}
        {...rest}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#6b7c86'},
  input: {
    borderColor: '#6b7c86',
    color: '#6b7c86',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});
