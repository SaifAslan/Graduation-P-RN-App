import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Index: undefined;
  Success: undefined;
  Profile: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Success'>;

export default function Success() {
  const navigation = useNavigation<ProfileProps>();
  const handleContinueShopping = () => {
    navigation.navigate('Index');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Order Is Confirmed!</Text>

      <Image
        source={require('../assets/images/order-placed-4283423-3581435.webp')}
        style={styles.image}
      />
      <Button title="Continue Shopping" onPress={handleContinueShopping} />
      <Button title="View Orders" onPress={handleProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
    height: 300,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginHorizontal: 20,
    marginTop: 40,
  },
});
