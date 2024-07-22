import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AddToCart from '@/components/Cart_Button/AddtoCart';
const ProductDetailPage = () => {
  const params = useLocalSearchParams();
  const color = params?.Colour as string
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: params?.ImageURL as string }} style={styles.image} />
      </View>
      <Text style={styles.price}>{params?.Gender}</Text> 
      <Text style={styles.title}>{params?.ProductTitle}</Text>        

      <View style={styles.infoContainer}>
        <View>
        <Text style={styles.PriceButtonText}>{params?.Category}</Text>
        <Text style={styles.subCategory}>{params?.SubCategory}</Text>
        <Text style={styles.subCategory}>{params?.Usage}</Text>
       </View>
       <View>
           <View style={{backgroundColor: color.toLowerCase(), height: 20, width: 20, borderColor: `${color.toLowerCase() == 'white' ? 'black': 'white'}`, borderWidth: 2}}></View>
       </View>
      </View>
      <View style={styles.optionsContainer}>
       <AddToCart isCart Product={params}/>
        <TouchableOpacity style={styles.PriceButton}>
          <Text style={styles.PriceButtonText}>${params?.UnitPrice}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: 'black',
    height: 300,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 275,
    resizeMode: 'contain',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
  },
  subCategory: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 100,
    width: 'auto',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 100
  },
  PriceButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  PriceButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '900'
  },
});

export default ProductDetailPage;
