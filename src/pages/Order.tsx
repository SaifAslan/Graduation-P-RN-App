import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {IOrder} from '../interfaces/order';
import AddressCard from '../components/AddressCard';
import {MAIN_GREY_COLOR} from '../utils/constants';
import ProductCardCart from '../components/ProductCardCart';
import Spacer from '../components/Spacer';
import {useNavigation} from '@react-navigation/native';
import {IProduct} from '../interfaces/product';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface IProps {
  route: {params: {order: IOrder}};
}
type RootStackParamList = {
  Product: {product: IProduct};
  Order: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, 'Order'>;

export default function Order({route}: IProps) {
  const {order} = route.params;
  const date = new Date(order?.orderDate);
  const navigation = useNavigation<ProfileProps>();

  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 5}}>
        {/* @ts-ignore */}
          Order ID: <Text style={{color: MAIN_GREY_COLOR}}>{order._id}</Text>{' '}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 5}}>
          Total:{' '}
          <Text style={{color: MAIN_GREY_COLOR}}>Rs {order?.totalPrice}</Text>{' '}
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 5}}>
          Date:{' '}
          <Text style={{color: MAIN_GREY_COLOR}}>{date.toDateString()}</Text>
        </Text>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 5}}>
          Order Status:{' '}
          <Text
            style={{color: order?.orderStatus == 'Pending' ? 'red' : 'green'}}>
            {order?.orderStatus}
          </Text>
        </Text>
      </View>
      <View style={styles.addressView}>
        <Text style={styles.sectionTitle}>Address: </Text>
        <View style={styles.addressContainer}>
          <View style={styles.addressInnerContainer}>
            <Text style={styles.addressTitle}>{order?.address.title}</Text>
            <Text>
              {order?.address.street +
                ', ' +
                order?.address.city +
                ', ' +
                order?.address.state +
                ', ' +
                order?.address.country}
            </Text>
            <Text>{order?.address.postalCode}</Text>
          </View>
        </View>
      </View>

      <View style={styles.productsView}>
        <Text>Items: </Text>
        <View style={styles.productsContainer}>
          {order?.items.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate('Product', {product: item.product})
                }>
                <ProductCardCart cartPage={false} item={item} />
              </Pressable>
            );
          })}
        </View>
      </View>

      <Spacer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_GREY_COLOR,
    flex: 1,
  },
  addressView: {
    paddingTop: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  addressContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    // width:'90%'
  },
  sectionTitle: {
    marginStart: 10,
  },

  addressInnerContainer: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: MAIN_GREY_COLOR,
    padding: 10,
  },
  addressTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productsView: {
    padding: 20,
    backgroundColor: 'white',
    // height: 300,
  },
  productsContainer: {
    width: '100%',
    marginTop: 10,
    flexGrow: 0,
  },
});
