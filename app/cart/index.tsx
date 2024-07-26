import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Ionicons } from '@expo/vector-icons';
import CartList from '@/components/CartList'
import OrderSummary from '@/components/OrderSummary';
import { RemoveAll } from '@/store/slices/CartSlice';
import { useNavigation } from 'expo-router';
import HeaderLayout from '@/components/Header/Header';
export default function Cart() {
  const data = useSelector((state: RootState) => state.cart)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleCheckout = () => {
      navigation.navigate("checkout/index" as never)
  }
  return (
    <><HeaderLayout />
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', fontStyle: 'italic', color: 'black' }}>Your Cart</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>Total In Cart: {data.items.length}</Text>

      </View>
      {data.items.length == 0 ? (<View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Cart Is Empty!</Text>
        <Ionicons name='sad-outline' color={'red'} size={30} />
      </View>
      ) :
        <>
          <CartList />
          <OrderSummary tax={2} shipping={5} subtotal={data.totalAmount} />
        </>}

      <View style={styles.footer}>
        <TouchableOpacity disabled={data.items.length == 0} onPress={handleCheckout} style={[styles.checkoutButton, { opacity: data.items.length == 0 ? .7 : 1 }]}>
          <Text style={styles.checkoutButtonText}>Proceed To Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={data.items.length == 0} onPress={() => dispatch(RemoveAll())} style={[styles.checkoutButton, { margin: 15, backgroundColor: '#f8f8f8', borderWidth: 1, opacity: data.items.length == 0 ? .7 : 1 }]}>
          <Text>Delete All</Text>
        </TouchableOpacity>
      </View>
    </View></>
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
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#b1b2b2', // Light gray border
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
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