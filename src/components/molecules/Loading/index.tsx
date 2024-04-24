import React from 'react';
import {StyleSheet, Text} from 'react-native';

function Loading(): React.JSX.Element {
  return <Text style={styles.loading}>Loading...</Text>;
}
export default Loading;

const styles = StyleSheet.create({
  loading: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#616161',
  },
});
