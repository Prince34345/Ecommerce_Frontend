import { View, FlatList, ActivityIndicator, Pressable, StyleSheet, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllProduct } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Card';
import { fetchSearchProduct, updatePage } from '@/store/slices/searchSlice';
import { Ionicons } from '@expo/vector-icons';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<any[]>([]);
  const searchTerm = useSelector((state: RootState) => state.search.queryString);
  const Page = useSelector((state: RootState) => state.search.page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchTerm) {
          const response = await dispatch(fetchAllProduct(Page));
          const updatedProducts = Page === 1 ? response.payload : [...products, ...response.payload];
          setProducts(updatedProducts);
        } else {
          const response = await dispatch(fetchSearchProduct({ page: Page, searchTerm }));
          const updatedProducts = Page === 1 ? response.payload : [...products, ...response.payload];
          setProducts(updatedProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, Page, searchTerm]);

  function handleLoadMore() {
    dispatch(updatePage(Page + 1));
  }

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f1f1f" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
      <Pressable style={[styles.button, {backgroundColor: '#d8d8d8',borderTopEndRadius: 40,borderBottomLeftRadius:40}]}><Text style={{fontSize: 20, letterSpacing: 1,textTransform: 'uppercase'}}>Sort</Text><View><Ionicons name='shuffle-sharp' size={30}    /></View></Pressable>
      <Pressable style={[styles.button, {backgroundColor: 'black',borderBottomEndRadius: 40,borderTopStartRadius:40}]}><Text style={{fontSize: 20, letterSpacing: 1,textTransform: 'uppercase', color:'white'}}>Filter</Text><View><Ionicons name='funnel-sharp'  size={30} color={'white'} /></View></Pressable>
      </View>
      <FlatList
        nestedScrollEnabled={true}
        style={{ margin: 10 }}
        numColumns={2}
        data={products}
        renderItem={({ item }) => <ProductCard product={item}/>}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    button: {
         paddingHorizontal: 30,
         paddingVertical: 15,
         color: 'black',
         margin: 20,
         display: 'flex',
         alignItems: 'center',
         flexDirection: 'row'
    }
})