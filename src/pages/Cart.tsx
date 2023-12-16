import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {useAppSelector} from '../redux/hooks';
import {IProduct} from '../interfaces/product';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ProductCardCart from '../components/ProductCardCart';
import AppButton from '../components/AppButton';
import {ICart} from '../interfaces/cart';
import { calcTotal } from '../utils/helpers';
import OrderSummary from '../components/OrderSummary';
import Spacer from '../components/Spacer';

type RootStackParamList = {
  Product: {product: IProduct};
  Favourites: undefined;
  Checkout: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Favourites'>;

export default function Cart() {
  const cartItems = useAppSelector(state => state.cart.items);
  const navigation = useNavigation<ProfileProps>();
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Cart</Text>
      <FlatList
        getItemLayout={(data, index) => ({
          length: cartItems.length,
          offset: 350 * index,
          index,
        })}
        numColumns={1}
        //@ts-ignore
        horizontal={false}
        data={cartItems}
        style={styles.productsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={itemData => {
          return <ProductCardCart cartPage={true} item={itemData.item} />;
        }}
        // keyExtractor={(item) => item._id}
      />
      <View style={styles.couponContainer}>
        <View style={styles.couponInnerContainer}>
          <TextInput style={styles.CouponInput} placeholder="Coupon Code" />
          <AppButton
            PressableStyle={styles.btnCouponPressable}
            ViewStyle={styles.btnCouponView}
            onPress={() => {}}
            Content={<Text style={{fontWeight:"300"}}>APPLY</Text>}
          />
        </View>
      </View>
      {<OrderSummary />}
      <AppButton
        ViewStyle={styles.btnView}
        PressableStyle={styles.btnPressable}
        onPress={() => {
          navigation.navigate('Checkout');
        }}
        Content={<Text style={styles.btnText}>Proceed to checkout</Text>}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '300',
  },
  productsContainer: {
    width: '100%',
    height: 240,
    paddingHorizontal: 20,
    marginTop:10
  },

  btnPressable: {
    backgroundColor: '#333333',
    height: 57,
    width: '100%',
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  btnView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  couponContainer: {
    width: '100%',
    marginVertical: 16,
  },
  couponInnerContainer: {
    marginHorizontal: 20,
    height: 48,
    flexDirection: 'row',
  },
  CouponInput: {
    flex: 2.5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal:12,
    paddingVertical:16,
    marginRight:12
  },
  btnCouponPressable: {
    height: '100%',
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
  },
  btnCouponView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

