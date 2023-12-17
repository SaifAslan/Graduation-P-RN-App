import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Index: undefined;
  Profile: undefined;
  Favourites: undefined;
  Search: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Favourites'>;

export default function StickyFooter() {
  const navigation = useNavigation<ProfileProps>();
  //@ts-ignore
  const handleNavigation = (page: string) => navigation.navigate(page);
  return (
    <View style={styles.container}>
      {/* <Pressable>
        <Image source={require('../assets/images/Search_duotone_line.png')} />
      </Pressable> */}
      <Pressable onPress={() => handleNavigation('Favourites')}>
        <Image source={require('../assets/images/Star.png')} />
      </Pressable>
      <Pressable onPress={() => handleNavigation('Index')}>
        <Image source={require('../assets/images/Home_duotone.png')} />
      </Pressable>
      <Pressable onPress={() => handleNavigation('Profile')}>
        <Image source={require('../assets/images/User_duotone.png')} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: {height: -1, width: 0},
    shadowOpacity: 0.2,
  },
});
