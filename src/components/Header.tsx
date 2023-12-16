import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Header(): JSX.Element {
  const navigatation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable>
        <Image source={require('../assets/images/Menu.png')} />
      </Pressable>
      <Pressable>
        <Text style={styles.logo}>Leaf</Text>
      </Pressable>
      <Pressable onPress={()=>navigatation.navigate('Cart')}>
      <Image source={require('../assets/images/Basket_alt_3.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 20,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
  },
  logo:{
    fontSize:20,
    fontWeight: "bold",
  }
});
