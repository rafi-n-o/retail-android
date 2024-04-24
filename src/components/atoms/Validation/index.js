import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Validation = ({message}) => {
  return <Text style={styles.message}>{message}</Text>;
};

export default Validation;

const styles = StyleSheet.create({
  message: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#e53935',
  },
});
