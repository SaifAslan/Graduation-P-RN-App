import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../redux/hooks';
import { calcTotal } from '../utils/helpers';

export default function OrderSummary() {
    const cart = useAppSelector(state => state.cart);
    const total = calcTotal(cart).toFixed(2)
    const vat = (+total * 0.2).toFixed(2);
    const subTotal = (+total - +vat).toFixed(2);
    
  return (
    <View style={styles.totalsContainer}>
        <View style={styles.totalsInnerContainer}>
          <View style={styles.total}>
            <Text style={styles.totalTitle}>Subtotal:</Text>
            <Text style={styles.totalAmount}>Rs {subTotal}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalTitle}>Discount:</Text>
            <Text style={styles.totalAmount}>- Rs 0</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalTitle}>VAT:</Text>
            <Text style={styles.totalAmount}>Rs {vat}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalTitle}>Total:</Text>
            <Text style={styles.totalAmount}>Rs {total}</Text>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    totalsContainer: {
        marginBottom: 40,
        width: '100%',
        height: 120,
      },
      total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      totalTitle: {
        color: '#67686E',
        fontSize: 13,
      },
      totalAmount: {
        color: '#333A3A',
        fontSize: 13,
      },
      totalsInnerContainer: {
        backgroundColor: '#F5F5F5',
        padding: 12,
        justifyContent: 'space-between',
        marginHorizontal: 20,
        flex: 1,
      },
})