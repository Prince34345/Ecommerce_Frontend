import ProductDetailPage from '@/app/pdp';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

const ProductCard = ({ product }: { product?: any }) => {
  const navigator = useNavigation();

  const handlePDPredirect = () => {
    navigator.navigate("pdp/index" as never);
    navigator.setParams(product as any);
  };

  return (
    <Pressable onPress={handlePDPredirect} style={styles.pressable}>
      <View style={styles.card}>
        <Image source={{ uri: product.ImageURL }} style={styles.image} />
        <View style={{ marginTop: 8 }}>
          <Text style={styles.title}>{product.ProductTitle}</Text>
          <Text style={styles.description}>{product.SubCategory}</Text>
          <Text style={styles.price}>${product.UnitPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: "center"
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    margin: 8,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductCard;
