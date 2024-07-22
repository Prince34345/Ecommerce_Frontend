import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SingleProduct } from '@/store/slices/Cart';
import AddToCart from '../Cart_Button/AddtoCart';

export default function index() {
    const data = useSelector((state: RootState) => state.cart)
    const renderCartItem = ({ item }: { item: SingleProduct }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.ImageURL }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.ProductTitle}</Text>
                <Text style={styles.productPrice}>${item.UnitPrice}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
                <AddToCart Product={item} isCart={true} isList />
            </TouchableOpacity>
        </View>
    );
    return (
        <FlatList
            data={data.items}
            renderItem={renderCartItem}
            contentContainerStyle={styles.cartList}
        />
    )
}

const styles =StyleSheet.create({
   
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
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000', // Black text
        textAlign: "left"
      },
      productPrice: {
        fontSize: 14,
        color: '#000000', // Black text
        fontWeight: '900'
      },
      iconButton: {
        padding: 10,
      },
      iconText: {
        fontSize: 16,
        color: '#000000', // Black text
      },
})