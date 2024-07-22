import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SingleProduct } from '@/store/slices/Cart';
import AddToCart from '@/components/Cart_Button/AddtoCart';

export default function Cart() {
  const data = useSelector((state: RootState) => state.cart)
  const renderCartItem = ({item}: {item: SingleProduct}) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.ImageURL }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.ProductTitle}</Text>
        <Text style={styles.productPrice}>{item.UnitPrice}</Text>
      </View>
      <TouchableOpacity style={styles.iconButton}>
         <AddToCart Product={item} isCart={false} isList />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={data.items}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 20,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Light gray background
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
  productPrice: {
    fontSize: 14,
    color: '#000000', // Black text
  },
  iconButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#000000', // Black text
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#f8f8f8', // Light gray border
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#FFFFFF', // White background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black text
  },
});