import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProductCard from '../components/ProductCard';
import {IProduct} from '../interfaces/product';
import {useAppSelector} from '../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Spacer from '../components/Spacer';



type RootStackParamList = {
  Product: {product: IProduct};
  Favorites: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Favorites'>;

export default function Favorites() {
  const favorites = useAppSelector(state => state.favourite);
  const navigation = useNavigation<ProfileProps>();
  return (
    <View style={styles.container}>
      <View style={{ overflow: 'hidden'}}>
        <FlatList
          getItemLayout={(data, index) => ({
            length: favorites.products?.length,
            offset: 350 * index,
            index,
          })}
          numColumns={2}
          //@ts-ignore
          horizontal={false}
          data={favorites.products}
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={itemData => {
            return (
              <Pressable
                // onPress={() => handlePharmacyClick(itemData.index)}
                onPress={() =>
                  navigation.navigate('Product', {product: itemData.item})
                }>
                <ProductCard product={itemData.item} />
              </Pressable>
            );
          }}
        />
       <Spacer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  productsContainer: {
    width: '100%',
    backgroundColor: '#D9D9D9',
  },
});

