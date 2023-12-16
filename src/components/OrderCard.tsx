import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IOrder} from '../interfaces/order';
import {MAIN_GREY_COLOR} from '../utils/constants';

interface IProps {
  order: IOrder;
}

export default function OrderCard({order}: IProps) {

    const viewOrder = ():void => {

    }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* @ts-ignore */}
        <Text style={styles.title}>Order ID: {order._id}</Text>
        <Text>Items #:{order.items.length}</Text>
        <Text>Total: Rs {order.totalPrice}</Text>
        <Text>Address: {order.address.title}</Text>

        <Pressable onPress={()=>{viewOrder()}}>
          <Text style={styles.changeBtn}>View</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    width:'100%'
  },
  innerContainer: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: MAIN_GREY_COLOR,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  changeBtn: {
    color: 'green',
    marginTop: 10,
  },
  deleteBtn: {
    color: 'red',
    marginTop: 10,
    marginEnd: 10,
  },
});
