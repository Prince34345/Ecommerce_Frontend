import { RemoveItemfromCart, updateCart } from '@/store/slices/CartSlice'
import { RootState } from '@/store/store'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
type ButtonProps = {
    isCart?: boolean
    isList?: boolean
    Product?: any
}

const AddToCart = ({ isCart, isList, Product }: ButtonProps) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)
    const [isCarted, setisCarted] = useState(isCart)
    const data = useSelector((state: RootState) => state.cart)

    const handleCart = () => {
        if (!isCarted) {
            dispatch(updateCart( {...Product, quantity: qty } ))
        }
        dispatch(updateCart({ ...Product, quantity: qty }))
        setisCarted(!isCart)
    }
    const quantityChecker = (isMethod: 'plus' | 'minus') => {
        if (isMethod == 'plus') {
            setQty((prev) => prev + 1)
            dispatch(updateCart( {...Product, quantity: qty + 1 } ))
        } else if (isMethod == 'minus') {
            setQty((prev) => prev - 1)
            dispatch(updateCart( {...Product, quantity: qty - 1 } ))
        }
    }
    const RemovefromCart = () => {
        dispatch(RemoveItemfromCart({ ...Product, quantity: qty }))
        setisCarted(isCart)
        setQty(1)
    }

    useFocusEffect(
        useCallback(() => {
            const isExistInCart = data.items.find((item) => String(Product.ProductId) === String(item.ProductId))
            if (isExistInCart) {
                setisCarted(false)
                setQty(isExistInCart.quantity)
            }else{
                setisCarted(true)
                setQty(qty)
            }
        }, [data])
    );

    return (
        <>
            {
                isCarted ? <TouchableOpacity style={[styles.AddButton, { transform: [{ scale: isList ? 0.75 : 1 }] }]} onPress={handleCart}  >
                    <Text style={styles.AddButtonText}>Add to Cart</Text>
                    <Ionicons name='cart' color={'white'} size={30} />
                </TouchableOpacity> :
                    <View style={[styles.cartItem, , { transform: [{ scale: isList ? 0.85 : 1 }] }]}>
                        <View style={styles.itemControls}>
                            <Pressable disabled={qty == 1 ? true : false} onPress={() => quantityChecker('minus')} ><Ionicons style={styles.itemName} name='remove-circle-outline' /></Pressable>
                            <Text style={styles.itemQuantity}>{qty}</Text>
                            <Pressable onPress={() => quantityChecker('plus')}><Ionicons style={styles.itemName} name='add-circle-outline' /></Pressable>
                        </View>
                        {isList ? <TouchableOpacity onPress={RemovefromCart}>
                            <Ionicons name='trash' size={30} style={{ backgroundColor: 'black', color: '#f8f8f8', padding: 8, borderRadius: 5 }} />
                        </TouchableOpacity> : <></>}
                    </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    AddButton: {
        backgroundColor: '#000000',
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    AddButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 5,
    },
    itemName: {
        fontSize: 30,
    },
    itemControls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    itemQuantity: {
        fontSize: 18,
        marginHorizontal: 10,
    },
})

export default AddToCart