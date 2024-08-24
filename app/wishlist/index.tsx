import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { postwishlistThunk, ProductInfo, removeItemfromWishlist } from '@/store/slices/wishlistSlice';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '@/store/store';
import { useAuth } from '@/context/auth';
import NotAuthenticated from '@/components/not-authenticated';

const WishlistScreen: React.FC = () => {
  const [isLiked, setIsLiked] = useState(true)
  const { items } = useSelector((state: RootState) => state.wishlist);
  const { authUser } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const renderItem = ({ item }: { item: ProductInfo }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.ImageURL }} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.ProductTitle}</Text>
      </View>
      <Ionicons
        name={"heart"}
        size={30}
        style={{ textAlign: 'right' }}
        color={'red'}
        onPress={() => handleWishlistRemove(item)}
      />
    </View>
  );

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f1f1f" />
      </View>
    );
  };

  const handleWishlistRemove = (item: any) => {
    setIsLiked(false)
    dispatch(removeItemfromWishlist(item))
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if(!isLiked) {
      timer = setTimeout(() => {
          dispatch(postwishlistThunk(items));
      }, 1000);
    }
    return () => {
        if (timer) clearTimeout(timer);
    };
}, [items, isLiked, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Wishlist</Text>
      {!authUser ? (
        <NotAuthenticated />
      ) : items?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty!</Text>
          <Ionicons name='sad-outline' size={30} color={"#888"} />
        </View>
      ) : (
        <FlatList
          style={{ margin: 10 }}
          numColumns={2}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.ProductId}-${index}`}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'left',
    margin: 40,
    fontSize: 25,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    color: '#888',
  },
});

export default WishlistScreen;
function dispatch(arg0: any): void {
  throw new Error('Function not implemented.');
}

