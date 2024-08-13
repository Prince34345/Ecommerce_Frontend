// WishlistScreen.tsx

import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getwishlistThunk, postwishlistThunk, ProductInfo } from '@/store/slices/wishlistSlice';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '@/store/store';
import { useAuth } from '@/context/auth';
import  NotAuthenticated from '@/components/not-authenticated';
import { useFocusEffect } from 'expo-router';
import Liked from '@/components/liked';


const WishlistScreen: React.FC = () => {
  const {items,  error} = useSelector((state: RootState) => state.wishlist)
  const { user } = useAuth()

  const renderItem = ({ item }: { item: ProductInfo }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.ImageURL }} />
      <View>
        <Text style={styles.title}>{item.ProductTitle}</Text>
      </View>
      <Pressable>
        <Liked product={item}/>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'left', margin: 40, fontSize: 25, fontWeight: "bold"}}>Wishlist</Text>
      <FlatList
        data={items}
        renderItem={(item) => renderItem(item)}
        ListEmptyComponent={() => (
           <View style={styles.emptyContainer}>
            {!user ? <NotAuthenticated/> : <><Text style={styles.emptyText}>Your wishlist is empty!</Text><Ionicons name='sad' size={30} color={"red"}/></> }
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    margin: 25,
    paddingVertical: 30
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  likeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  emptyContainer: {
    paddingVertical: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    color: '#888',
  },
});

export default WishlistScreen;
