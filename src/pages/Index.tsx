import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainServiceURL} from '../utils/constants';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {updateCategories} from '../redux/feature/categorySlice';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';
import {IProduct} from '../interfaces/product';
import ProductCard from '../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ICategory} from '../interfaces/category';

type RootStackParamList = {
  Product: {product: IProduct};
  Index: undefined;
  Category: {category: ICategory};
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Index'>;

export default function Index() {
  const categories = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProfileProps>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<{skip: number; limit: number}>({
    skip: 0,
    limit: 100,
  });

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    console.log(pagination, products.length);
    if (pagination.limit > products.length) {
      getProducts();
    }
  }, [pagination.limit]);

  const getCategory = () => {
    axios
      .get(mainServiceURL() + '/api/category/')
      .then(response => {
        dispatch(updateCategories(response.data.categories));
      })
      .catch(err => {
        Alert.alert('error', err.message);
      });
  };
  const getProducts = (): void => {
    axios
      .get(mainServiceURL() + '/api/products', {
        params: {
          skip: pagination.skip,
          limit: pagination.limit,
        },
      })
      .then(response => {
        setProducts(prev => {
          return [...prev, ...response.data.products];
        });
      })
      .catch(error => {
        console.log({error});
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperSection}>
        {categories.slice(0, 2).map((category, index) => {
          return (
            <View key={category.title} style={styles.upperCategoryCard}>
              <Image
                style={styles.upperCategoryCardIamge}
                source={{
                  uri: category.imageUrl,
                }}
              />
              <AppButton
                ViewStyle={styles.upperCategoryBtnView}
                PressableStyle={styles.upperCategoryBtnPressble}
                onPress={() =>
                  navigation.navigate('Category', {category: category})
                }
                Content={
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    {category.title.split('-')[0]}
                  </Text>
                }
              />
            </View>
          );
        })}
      </View>
      <View style={styles.lowerSection}>
        {categories.slice(2).map((category, index) => {
          return (
            <View key={category.title} style={styles.lowerCategoryCard}>
              <Image
                style={styles.lowerCategoryCardIamge}
                source={{
                  uri: category.imageUrl,
                }}
              />
              <AppButton
                onPress={() =>
                  navigation.navigate('Category', {category: category})
                }
                ViewStyle={styles.lowerCategoryBtnView}
                PressableStyle={styles.lowerCategoryBtnPressble}
                Content={
                  <Text
                    style={{
                      fontSize: 36,
                      width: '100%',
                      textAlign: 'center',
                      position: 'absolute',
                      bottom: 16,
                      fontWeight: '600',
                      color: '#333333',
                      textShadowColor: 'rgba(255,255,255, 0.75)',
                      textShadowOffset: {width: -2, height: 2},
                      textShadowRadius: 10,
                    }}>
                    {category.title.split('-')[0]}
                  </Text>
                }
              />
            </View>
          );
        })}
      </View>
      <View style={{height: 500}}>
        <FlatList
          getItemLayout={(data, index) => ({
            length: products.length,
            offset: 250 * index,
            index,
          })}
          contentContainerStyle={{flexGrow: 1}}
          numColumns={2}
          //@ts-ignore
          horizontal={false}
          data={products}
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        //   onEndReachedThreshold={0.3}
        //   onEndReached={() => {
        //     setPagination(prev => {
        //       return {skip: prev.limit, limit: prev.limit + 20};
        //     });
        //   }}
          keyExtractor={(item, index) => String(item.id)}
          columnWrapperStyle={{justifyContent: 'space-between'}}
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
          // keyExtractor={(item) => item._id}
        />
      </View>

      <Spacer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  upperCategoryCard: {
    flex: 0.48,
    height: 208,
  },
  upperCategoryCardIamge: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperCategoryBtnPressble: {
    height: 39,
    position: 'absolute',
    bottom: 14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperCategoryBtnView: {
    width: 120,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  lowerSection: {},
  lowerCategoryCard: {
    height: 234.33,
    marginBottom: 16,
  },
  lowerCategoryCardIamge: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerCategoryBtnPressble: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  lowerCategoryBtnView: {
    position: 'absolute',

    height: '100%',
    width: '100%',
  },
  productsContainer: {
    width: '100%',
    // backgroundColor: '#D9D9D9',

    // height: 'auto',
  },
});
