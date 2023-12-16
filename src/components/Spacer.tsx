import {StyleSheet, View} from 'react-native';
import React from 'react';

export default function Spacer() {
  return <View style={styles.spacer}></View>;
}

const styles = StyleSheet.create({
  spacer: {
    height: 90,
  },
});
