import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Use this for Expo; for plain React Native, use 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type OrderSummaryprops = {
    subtotal: number
    tax: number
    shipping: number
}

const OrderSummary = ({ tax, subtotal, shipping }: OrderSummaryprops) => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.summaryItem}>
                    <Ionicons name="pricetag" size={24} color="#000000" />
                    <Text style={styles.summaryText}>Subtotal</Text>
                    <Text style={styles.summaryValue}>${subtotal}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Ionicons name="calculator" size={24} color="#000000" />
                    <Text style={styles.summaryText}>Tax</Text>
                    <Text style={styles.summaryValue}>${tax}</Text>
                </View>
            </View>
            <View>
                <View style={styles.summaryItem}>
                    <Ionicons name="cart" size={24} color="#000000" />
                    <Text style={styles.summaryText}>Shipping</Text>
                    <Text style={styles.summaryValue}>${shipping}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <Ionicons name="wallet" size={24} color="#000000" />
                    <Text style={styles.summaryText}>Estimated Total</Text>
                    <Text style={styles.summaryValue}>${tax + subtotal + shipping}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8', // Light gray background
        padding: 20,
        borderRadius: 10,
        margin: 10,
        transform: [{ scale: 0.85 }]
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    summaryText: {
        fontSize: 16,
        color: '#000000', // Black text
        flex: 1,
        marginLeft: 10,
    },
    summaryValue: {
        fontSize: 16,
        color: '#000000', // Black text
        fontWeight: 'bold',
    },
});

export default OrderSummary;
