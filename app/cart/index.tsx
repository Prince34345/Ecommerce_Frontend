import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import CartList from '@/components/CartList'
import OrderSummary from '@/components/OrderSummary';
export default function Cart() {
  const data = useSelector((state: RootState) => state.cart)
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {data.items.length == 0 ? (<View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Cart Is Empty!</Text>
        <Ionicons name='sad-outline' color={'red'} size={30} />
      </View>
      ) :
        <>
          <CartList />
          <OrderSummary tax={2} shipping={5} subtotal={data.totalAmount} />
        </>
      }

      <View style={styles.footer}>
        <TouchableOpacity disabled={data.items.length == 0} style={[styles.checkoutButton, {opacity: data.items.length == 0 ? .7: 1}]} >
          <Text style={styles.checkoutButtonText}>Proceed To Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 22,

    fontWeight: '600',
    color: 'black'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
    marginBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#b1b2b2', // Light gray border
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f8f8',
  },
});