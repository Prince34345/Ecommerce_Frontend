// src/ProductDetailPage.js
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetailPage = () => {
  const params = useNavigation().getState().routes[0].params as any
  return (
    <ScrollView style={[styles.container, {borderWidth: .2, borderColor: "black", margin: 12.5}]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: params?.ImageURL }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{params.ProductTitle}</Text>
        <View style={[styles.description, { display: "flex", flexDirection: "column" }]}>
          <Text style={{ fontSize: 15 }}>{params.Category}</Text>
          <Text style={{ fontSize: 12, color: "grey" }}>
            {params.SubCategory}
          </Text>
        </View>
        <View style={styles.colorOptions}>
          <View style={[styles.colorCircle, { backgroundColor: params.Colour?.toLowerCase() }]}></View>
        </View>
        <View style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "row" }}>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{params.Gender}</Text>
            {/* Additional content */}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{params.ProductType}</Text>
            {/* Additional content */}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{params.Usage}</Text>
            {/* Additional content */}
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.addToCartButton, {display: "flex", justifyContent: "space-around", margin: 25 ,alignItems: "center", flexDirection: "row"}]}>
        <Text style={styles.addToCartText}>ADD TO CART</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: "#b0eaa4" }]}>${params.UnitPrice}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // light sage background
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
    // borderColor: "black",
    // borderBottomWidth: .5
  },
  image: {
    width: 300,
    height: 300,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b0eaa4', // grey color

  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    marginVertical: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  brown: {
    backgroundColor: '#8B4513',
  },
  white: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4A4A4A',
  },
  ProductType: {
    fontSize: 16,
    color: '#b0eaa4',
    fontWeight: "900"
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  addToCartButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    backgroundColor: "#b0eaa4", padding: 15, borderRadius: 5,
  },
});

export default ProductDetailPage;
