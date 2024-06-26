import { View, Text, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllProduct } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Card';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.allProduct);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<any>([])

  useEffect(() => {
    // console.log("useEffect called")
    if (page === 1) {
      dispatch(fetchAllProduct(page))
    }
  }, []);

  useEffect(() => {
    // console.log("Updating Products useEffect", data[0])/
    setProducts([...products, ...data])
  }, [data])

  function handleLoadMore() {
    // console.log("handleLoadMore called", page)
    dispatch(fetchAllProduct(page + 1))
    setPage(page + 1)
  }

  const renderFooter = () => {
    return <View style={{ marginTop: 10, alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1f1f1f" />
    </View>
  };

  return (
    <>

      <View style={{ flex: 1 }}>
        <View style={{ margin: 5, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <TouchableOpacity><View style={{ borderTopEndRadius: 10, borderBottomStartRadius: 10, backgroundColor: "grey", padding: 10, paddingHorizontal: 20, margin: 10, display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "row" }} ><Text style={{ fontSize: 18, color: "#b0eaa4", fontWeight: 700, textTransform: "capitalize", margin: 5 }} >Sort</Text><FontAwesome   color={"#b0eaa4"} name='sort-alpha-asc' size={25} /></View></TouchableOpacity>
          <TouchableOpacity><View style={{ borderTopStartRadius: 10, borderBottomEndRadius: 10, backgroundColor: "grey", padding: 10, paddingHorizontal: 20, margin: 10, display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "row" }} ><Text style={{ fontSize: 18, color: "#b0eaa4", fontWeight: 700, textTransform: "capitalize", margin: 5 }} >filter</Text><FontAwesome color={"#b0eaa4"}  name='filter' size={25} /></View></TouchableOpacity>
        </View>
        <FlatList
          nestedScrollEnabled={true}
          style={{ margin: 10 }}
          numColumns={2}
          data={products}
          renderItem={(item) => <ProductCard key={item.item.id} product={item.item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  )
}