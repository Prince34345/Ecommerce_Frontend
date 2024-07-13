import { View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllProduct } from '@/store/slices/productsSlice';
import ProductCard from '@/components/Card';
import { fetchSearchProduct, updatePage } from '@/store/slices/searchSlice';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<any[]>([]);
  const searchTerm = useSelector((state: RootState) => state.search.queryString);
  const Page = useSelector((state: RootState) => state.search.page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const response = await dispatch(fetchSearchProduct({ page: Page, searchTerm }));
          const updatedProducts = Page === 1 ? response.payload : [...products, ...response.payload];
          setProducts(updatedProducts);
        } else {
          const response = await dispatch(fetchAllProduct(Page));
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
      <FlatList
        nestedScrollEnabled={true}
        style={{ margin: 10 }}
        numColumns={2}
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
