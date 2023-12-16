import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IProduct} from '../interfaces/product';
import AppButton from '../components/AppButton';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addProduct} from '../redux/feature/cartSlice';
import SuggestedProduct from '../components/SuggestedProduct';

type IProps = {
  route: {params: {product: IProduct}};
};

export default function Product({route}: IProps) {
  const {brand_name, details, sell_price, mrp, discount, imageUri, sizes, id} =
    route.params.product;
  const [sizesList, setSizesList] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [productCountInCart, setProductCountInCart] = useState<number>(0);

  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let tempSizes = sizes.replace('Size:', '').split(',');
    // console.log(tempSizes);
    setSizesList(tempSizes);
    setSelectedSize(tempSizes[0]);
  }, []);

  useEffect(() => {
    let foundProduct = cart.items.find(
      item => item.product.id === id && item.size === selectedSize,
    );
    if (foundProduct) {
      setProductCountInCart(foundProduct.quantity);
    } else {
      setProductCountInCart(0);
    }
  }, [selectedSize, id]);

  // useEffect(() => {
  //   let foundProduct = cart.items.find(
  //     item => item.product.id === id && item.size === selectedSize,
  //   );
  //   if (foundProduct) {
  //     setProductCountInCart(foundProduct.quantity);
  //   } else {
  //     setProductCountInCart(0);
  //   }
  // }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>
        <Image style={styles.image} source={{uri: imageUri}} />
        {discount != '0% off' && (
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>{discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.descriptionSection}>
          <Text style={styles.brand}>{brand_name}</Text>
          <Text style={styles.title} >
            {details}
          </Text>
          <View
            style={{
              ...styles.priceContainer,
              justifyContent:
                discount == '0% off' ? 'flex-end' : 'space-between',
            }}>
            {discount != '0% off' && (
              <Text style={styles.mrp}>{mrp.replace('\n', ' ')}</Text>
            )}
            <Text
              style={{
                ...styles.sellPrice,
                color: discount == '0% off' ? 'black' : 'red',
              }}>
              Rs {sell_price}
            </Text>
          </View>
        </View>
        <View style={styles.sizeAndPurshase}>
          <View style={styles.sizesContainer}>
            <Text>Size: {selectedSize}</Text>
            <ScrollView horizontal style={styles.sizeListContainer}>
              {sizesList.map((size, index) => {
                return (
                  <Pressable
                    key={index}
                    // onPress={() => handlePharmacyClick(itemData.index)}
                    onPress={() => setSelectedSize(size)}>
                    <View
                      style={
                        selectedSize == size
                          ? styles.sizeContainerSelected
                          : styles.sizeContainer
                      }>
                      <Text
                        style={
                          selectedSize == size
                            ? styles.sizeSelected
                            : styles.size
                        }>
                        {size}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.purshase}>
            <View style={styles.counter}>
              <Text style={{fontSize: 24, textAlign: 'center'}}>
                {productCountInCart}
              </Text>
            </View>
            <AppButton
              ViewStyle={styles.buttonView}
              PressableStyle={styles.button}
              onPress={() => {
                dispatch(
                  addProduct({
                    product: route.params.product,
                    quantity: productCountInCart + 1,
                    size: selectedSize,
                  }),
                );
                setProductCountInCart(prev => prev + 1);
              }}
              Content={
                <Text
                  style={{color: 'white', fontSize: 24, textAlign: 'center'}}>
                  ADD TO CART
                </Text>
              }
            />
          </View>
        </View>
      </View>
      <SuggestedProduct productId={id}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
  },
  heroContainer: {
    flex: 1,
    height: 320,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  infoContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    // width: '100%',
    textTransform: 'capitalize',
    fontSize: 27,
    marginVertical:10
  },
  descriptionSection: {
    flex: 0.5,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 1,
  },
  brand: {
    textTransform: 'uppercase',
    color: '#73838D',
    fontSize: 22,
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
    fontSize: 24,
  },
  sellPrice: {
    fontWeight: '600',
    color: 'red',
    fontSize: 24,
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
  sizeAndPurshase: {
    backgroundColor: 'white',
    flex: 0.5,
  },
  sizesContainer: {
    padding: 20,
  },
  sizeListContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  sizeContainerSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 10,
    height: 50,
    padding: 10,
    backgroundColor: '#2F2F2F',
    width: 100,
  },
  sizeSelected: {
    color: 'white',
  },
  sizeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 10,
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    width: 100,
    borderWidth: 2,
    borderColor: '#2F2F2F',
  },
  size: {
    color: '#2F2F2F',
  },
  purshase: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'row',
  },
  counter: {
    flex: 1,
    width: '100%',
    height: 75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  button: {
    height: 75,
    backgroundColor: '#2F2F2F',
    flex: 3,
    width: '100%',
  },
  buttonView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
