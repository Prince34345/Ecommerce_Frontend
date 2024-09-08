import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import OrderSummary from '@/components/OrderSummary'; 
import HeaderLayout from '@/components/Header/Header';
import ModalBox from '@/components/modal';
import AddressForm from '@/components/addressform';
import { addAddress, postaddressThunk } from '@/store/slices/addressSlice';


function CheckoutPage ()  {
  const [paymentMethod, setPaymentMethod] = useState('');
  const data = useSelector((state: RootState) => state.cart);
  const {items} = useSelector((state: RootState) => state.address)
  const dispatch  = useDispatch();
  const [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
      timer = setTimeout(() => {
        dispatch(postaddressThunk(items) as any);
      }, 500)
      return () => {
         if (timer) {
             clearTimeout(timer)
         }
      } 
      
  }, [items, dispatch, addAddress])
  return (
    <><HeaderLayout />
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Pressable onPress={() => setIsAdd(true)} style={{width: "100%", backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' ,height: 60, borderRadius: 40}}>
            <Text style={styles.placeOrderButtonText}>Add Address</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'PayPal' && styles.selectedOption, { borderColor: '#0066b2' }]}
          onPress={() => setPaymentMethod('PayPal')}
        >
          <Ionicons name="logo-paypal" size={24} color={paymentMethod === 'PayPal' ? '#0066b2' : '#888888'} />
          <Text style={styles.paymentText}>PayPal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === 'G-Pay' && styles.selectedOption, { borderColor: 'red' }]}
          onPress={() => setPaymentMethod('G-Pay')}
        >
          <Ionicons name='cash' size={24} color={paymentMethod === 'G-Pay' ? 'red' : '#888888'} />
          <Text style={styles.paymentText}>Cash On Delieviry</Text>
        </TouchableOpacity>
      </View>
      <OrderSummary
        subtotal={data.totalAmount}
        tax={2}
        shipping={5} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
    <ModalBox visible={isAdd} onClose={() => setIsAdd(false)} noButton>
         <AddressForm onOpen={setIsAdd} />
    </ModalBox>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e1e1e1', // Light gray background
    padding: 10,
    borderRadius: 10,
    color: '#000000', // Black text
  },
  paymentOption: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Light gray background
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    borderWidth: 2,
  },
  paymentText: {
    fontSize: 16,
    color: '#000000', // Black text
    marginLeft: 10,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#f8f8f8', // Light gray border
    alignItems: 'center',
  },
  placeOrderButton: {
    backgroundColor: 'black', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  placeOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8f8f8',
  },
});

export default CheckoutPage;
