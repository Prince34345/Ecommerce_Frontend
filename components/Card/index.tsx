
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';




const ProductCard = ({ product }: {product?: any}) => {
  // console.log()
  return (
    <View style={styles.card}>
      <Image source={{uri: product.ImageURL}} style={styles.image} />
      <View style={{marginTop: 4}}> 
      <Text style={styles.title}>{product.ProductTitle.length > 20 ? product.ProductTitle.slice(0, 20) + "...": product.ProductTitle}</Text>

      </View>
      <Text style={styles.description}>{product.SubCategory}</Text>
      <View>
          <Text style={styles.price}>${product.UnitPrice}</Text>
      </View>
  
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 16,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 150,
    flex:1,
    height: 150,
    resizeMode:"contain",
    // marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: "center"
  },
  description: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starFilled: {
    color: '#ffa500',
  },
  starEmpty: {
    color: '#ddd',
  },
  button: {
    backgroundColor: 'grey',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#b0eaa4',
    fontWeight: 'bold',
  },
});

export default ProductCard;
