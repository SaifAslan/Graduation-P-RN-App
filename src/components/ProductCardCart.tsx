import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IProduct} from '../interfaces/product';
import AppButton from './AppButton';
import {useAppDispatch} from '../redux/hooks';
import {updateQuantity} from '../redux/feature/cartSlice';

interface IProps {
  item: {
    product: IProduct;
    size: string;
    quantity: number;
  };
}

export default function ProductCardCart(props: IProps) {
  const {product, size, quantity} = props.item;
  const dispatch = useAppDispatch();

  const counter = (
    <View style={styles.counter}>
      <AppButton
        Content={<Text style={styles.counterText}>+</Text>}
        onPress={() => {
          dispatch(
            updateQuantity({
              productId: product.id,
              quantity: quantity + 1,
              size: size,
            }),
          );
        }}
        PressableStyle={styles.btnPressable}
        ViewStyle={styles.btnView}
      />
      <Text style={styles.counterText}>{quantity}</Text>
      <AppButton
        Content={<Text style={styles.counterText}>-</Text>}
        onPress={() => { dispatch(
            updateQuantity({
              productId: product.id,
              quantity: quantity - 1,
              size: size,
            }),
          );}}
        PressableStyle={styles.btnPressable}
        ViewStyle={styles.btnView}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.itemImage} source={{uri: product.imageUri}} />
      <View style={styles.itemInfo}>
        <View style={styles.details}>
          <Text style={styles.brand}>{product.brand_name}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {product.details}
          </Text>
          <Text style={styles.size}>Size: {size}</Text>
          <View
            style={{
              ...styles.priceContainer,
              justifyContent:
                product.discount == '0% off' ? 'flex-end' : 'space-between',
            }}>
            {product.discount != '0% off' && (
              <Text style={styles.mrp}>{product.mrp?.replace('\n', ' ')}</Text>
            )}
            <Text
              style={{
                ...styles.sellPrice,
                color: product.discount == '0% off' ? 'black' : 'red',
              }}>
              Rs {product.sell_price}
            </Text>
          </View>
        </View>
        {counter}
      </View>
      {product.discount != '0% off' && (
        <View style={styles.discountContainer}>
          <Text style={styles.discount}>{product.discount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#F5F5F5',
    height: 122,
    flexDirection: 'row',
    width: '100%',
    padding: 12,
    marginBottom: 16,
  },
  itemImage: {
    flex: 1,
    marginRight: 15,
  },
  itemInfo: {
    flex: 3,
    flexDirection: 'row',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 0,
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
  brand: {
    fontSize: 11,
    color: '#6F7F8A',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 13,
    color: '#333A3A',
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  size: {
    fontSize: 14,
    color: '#6F7F8A',
  },
  details: {
    flex: 6,
    marginRight: 15,
  },
  counter: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnPressable: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD7E1',
    height: 32,
    width: 32,
  },
  btnView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 20,
  },
  discountContainer: {
    position: 'absolute',
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    left: 0,
    top: 12,
  },
  discount: {
    color: 'white',
    fontSize: 9,
  },
});
