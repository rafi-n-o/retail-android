import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({text, color = '#6b7c86', textColor = 'white', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({backgroundColor: color, padding: 10, borderRadius: 10}),
  text: textColor => ({
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: textColor,
    textAlign: 'center',
  }),
});
