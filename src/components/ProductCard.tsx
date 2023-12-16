import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IProduct} from '../interfaces/product';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import axios from 'axios';
import {mainServiceURL} from '../utils/constants';
import {updateFavorites, deleteProduct} from '../redux/feature/favouriteSlice';
import {useNavigation} from '@react-navigation/native';

export default function ProductCard(props: {product: IProduct}): JSX.Element {
  const {brand_name, details, sell_price, mrp, discount, imageUri} =
    props.product;
  const favourite = useAppSelector(state => state.favourite)?.products;
  const userInfo = useAppSelector(state => state.userInfo);
  const [inFavourites, setInFavourites] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let currentProduct = favourite.find(item => item._id === props.product._id);
    if (currentProduct) {
      setInFavourites(true);
    } else {
      setInFavourites(false);
    }
  }, [favourite]);

  const handleFavouritePress = () => {
    if (userInfo._id) {
      if (inFavourites) {
        console.log('hi');

        axios
          .post(mainServiceURL() + '/api/favorites/remove', {
            userId: userInfo._id,
            productId: props.product._id,
          })
          .then(response => {
            console.log(response.data.favorites, 'pro');

            dispatch(deleteProduct({productId: props.product.id}));
          })
          .catch(err => {
            console.log({err});
            Alert.alert('Error', err.message);
          });
      } else {
        axios
          .post(mainServiceURL() + '/api/favorites/add', {
            userId: userInfo._id,
            productId: props.product._id,
          })
          .then(response => {
            dispatch(
              updateFavorites({products: response.data.favorites.products}),
            );
          })
          .catch(err => {
            console.log({err});
            Alert.alert('Error', err.message);
          });
      }
    } else {
      Alert.alert("Can't add to fovrites", 'Please login or register first!', [
        {
          text: 'Login now',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
        {
          text: 'Cancel',
        },
      ]);
    }
  };

  return (
    <View style={ProductStyles.container}>
      <View style={ProductStyles.imageContainer}>
        <Image
          style={ProductStyles.image}
          source={{
            uri: imageUri,
          }}
          onError={() => {
            console.log('Image Error');
          }}
        />
      </View>
      <View style={ProductStyles.descriptionSection}>
        <Text style={ProductStyles.brand}>{brand_name}</Text>
        <Text style={ProductStyles.title} numberOfLines={2}>
          {details}
        </Text>
        <View
          style={{
            ...ProductStyles.priceContainer,
            justifyContent: discount == '0% off' ? 'flex-end' : 'space-between',
          }}>
          {discount != '0% off' && (
            <Text style={ProductStyles.mrp}>{mrp.replace('\n', ' ')}</Text>
          )}
          <Text
            style={{
              ...ProductStyles.sellPrice,
              color: discount == '0% off' ? 'black' : 'red',
            }}>
            Rs {sell_price}
          </Text>
        </View>
      </View>
      {discount != '0% off' && (
        <View style={ProductStyles.discountContainer}>
          <Text style={ProductStyles.discount}>{discount}</Text>
        </View>
      )}
      <Pressable
        onPress={handleFavouritePress}
        style={{
          width: 30,
          height: 30,
          position: 'absolute',
          top: 10,
          left: 10,
          borderRadius: 5,
          backgroundColor: inFavourites ? 'red' : 'white',
          padding: 5,
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../assets/images/Favorite_fill.png')}
        />
      </Pressable>
    </View>
  );
}

const ProductStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    width: 200,
    backgroundColor: 'white',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageContainer: {
    // height:200,
    width: '100%',
    flex: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  title: {
    // width: '100%',
    textTransform: 'capitalize',
    fontSize: 18,
  },
  descriptionSection: {
    flex: 1,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  brand: {
    textTransform: 'uppercase',
    color: '#73838D',
    fontSize: 14,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mrp: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
    fontWeight: '200',
    width: '50%',
  },
  sellPrice: {
    fontWeight: '600',
    color: 'red',
  },
  discountContainer: {
    position: 'absolute',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    right: 0,
    top: 20,
  },
  discount: {
    color: 'white',
  },
});
