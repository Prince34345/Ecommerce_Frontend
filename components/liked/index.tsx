import { ActivityIndicator, View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useAuth } from '@/context/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWishlist, removeItemfromWishlist, getwishlistThunk, postwishlistThunk } from '@/store/slices/wishlistSlice';
import { ProductInfo } from '@/store/slices/CartSlice';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '@/store/store';
import { useFocusEffect } from 'expo-router';

const Liked = ({ product }: { product: ProductInfo }) => {
    const [liked, setLiked] = useState(false);
    
    const { items, loading, error } = useSelector((state: RootState) => state.wishlist); // include error for debugging
    const { user } = useAuth();
    
    const dispatch = useDispatch<AppDispatch>();

    useFocusEffect(
        useCallback(() => {
            if (user) {
                console.log("Fetching wishlist...");
                dispatch(getwishlistThunk()).unwrap().catch((err) => console.error("Thunk error:", err));
            }
            const likedProduct = items.find(item => String(product.ProductId) === String(item.ProductId));
            setLiked(!!likedProduct);
        }, [items, product.ProductId, user, dispatch])
    );

    const handleWishlist = async () => {
        let updatedWishlist;
        if (liked) {
            dispatch(removeItemfromWishlist(product));
            updatedWishlist = items.filter(item => String(item.ProductId) !== String(product.ProductId));
        } else {
            dispatch(addItemToWishlist(product));
            updatedWishlist = [...items, product];
        }
        
        // Update the server with the new wishlist
        await dispatch(postwishlistThunk(updatedWishlist)).unwrap().catch((err) => console.error("Post thunk error:", err));

        // Update liked state only after server update
        setLiked(!liked);
    };

    return (
        <View>
            {user && (
                loading ? (
                    <View style={{ marginTop: 10, alignItems: "center" }}>
                        <ActivityIndicator size="small" color="gray" />
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <Ionicons
                        name={liked ? "heart" : "heart-outline"}
                        size={30}
                        style={{ textAlign: 'right' }}
                        color={liked ? 'red' : 'black'}
                        onPress={handleWishlist}
                    />
                )
            )}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
};

export default Liked;
