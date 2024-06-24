import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import ProductCard from '../Card'
import { fetchFavProduct } from '@/store/slices/favProductSlice';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function FavProduct() {

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.favProduct);
  const navigator = useNavigation()

  useEffect(() => {
    dispatch(fetchFavProduct())
  }, [dispatch]);

  

  const arr = [...data]
  return (
    <View>
    <View style={{display: "flex", justifyContent: "space-between", alignItems:"center", flexDirection: "row"}}>
          <Text style={{fontSize: 22, margin: 7, fontWeight: 900}}>Trending</Text>    
    </View> 
   
   {
    loading ?
    <View>
      {
        <>
        <Text>
             loading...
        </Text>
        </>
      }
    </View> :
    <FlatList nestedScrollEnabled={true} style={{margin: 10}} numColumns={2} data={arr} renderItem={(item) => <ProductCard key={item.index} product={item.item}/>}  /> 
}
</View>
  )
}