import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ProductCard from './ProductCard';
import axios from 'axios';
import {mainServiceURL} from '../utils/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IProduct} from '../interfaces/product';
import Spacer from './Spacer';

type RootStackParamList = {
  Product: {product: IProduct};
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Product'>;

export default function SuggestedProduct({productId}: {productId: number}) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, [productId]);

  const navigation = useNavigation<ProfileProps>();

  const getProducts = (): void => {
    axios
      .get(mainServiceURL() + '/api/get-recommendations/' + productId)
      .then(response => {
        setProducts(response.data.recommendedProducts);
      })
      .catch(error => {
        console.log({error});
      });
  };

  return (
    <View>
        <Text style={styles.sectionTitle}>Similar Products</Text>
    <View style={styles.productsContainer}>
      <View style={styles.leftProductsContainer}>
        {products.map((product, index) => {
          return (
            index % 2 == 0 && (
              <Pressable
                key={index}
                // onPress={() => handlePharmacyClick(itemData.index)}
                onPress={() => navigation.navigate('Product', {product})}>
                <ProductCard product={product} />
              </Pressable>
            )
          );
        })}
      </View>
      <View style={styles.rightProductsContainer}>
        {products.map((product, index) => {
          console.log(index % 2);

          return (
            index % 2 == 1 && (
              <Pressable
                key={index}
                // onPress={() => handlePharmacyClick(itemData.index)}
                onPress={() => navigation.navigate('Product', {product})}>
                <ProductCard product={product} />
              </Pressable>
            )
          );
        })}
      </View>
    </View>
    <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'row',

    // height: 'auto',
  },
  rightProductsContainer: {
    flex: 1,
  },
  leftProductsContainer: {
    flex: 1,
  },

  sectionTitle:{
    color:"rgba(0,0,0,0.6)",
    fontSize:20,
    padding:10
  }
});
