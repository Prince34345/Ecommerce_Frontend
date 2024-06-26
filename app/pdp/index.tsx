import { useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProductDetailPage = () => {
  const props = useGlobalSearchParams()
  console.log(props)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{uri: 'https://example.com/ramni-chair.jpg'}} 
          style={styles.productImage} 
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>Ramni Chair</Text>
        <Text style={styles.rating}>⭐ 4.5</Text>
        <Text style={styles.price}>$1700</Text>
        <View style={styles.tabContainer}>
          <Text style={styles.tab}>Description</Text>
          <Text style={styles.tab}>Reviews</Text>
          <Text style={styles.tab}>Offers</Text>
          <Text style={styles.tab}>Policy</Text>
        </View>
        <Text style={styles.description}>
          Minimalist styling is not about creating a cold, hard, empty white box of a home. It is about using simple and natural forms, and taking away layers without losing the aesthetic appeal of the space. The focus is on shape, with furniture and accessories.
        </Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>1</Text>
          <TouchableOpacity style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  productImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 18,
    color: '#FFA500',
    marginVertical: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 20,
  },
  tab: {
    fontSize: 18,
    color: '#888888',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  quantityNumber: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#FF5A5F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default ProductDetailPage;
