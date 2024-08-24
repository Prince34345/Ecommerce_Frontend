import { View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWishlist, removeItemfromWishlist, postwishlistThunk } from '@/store/slices/wishlistSlice';
import { ProductInfo } from '@/store/slices/CartSlice';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '@/store/store';

const Liked = ({ product }: { product: ProductInfo }) => {
    const [liked, setLiked] = useState(false);
    const { items } = useSelector((state: RootState) => state.wishlist);
    const [ userInteracted, setUserInteracted ] = useState(false);
    const { authUser } = useAuth();
    const dispatch = useDispatch<AppDispatch>();

    const handleWishlist = useCallback(() => {
        setUserInteracted(true);
        setLiked((prevLiked) => !prevLiked);
    }, []);

    useEffect(() => {
        if (userInteracted) {
            if (liked) {
                dispatch(addItemToWishlist(product));
            } else {
                dispatch(removeItemfromWishlist(product));
            }
        }
    }, [liked, userInteracted, dispatch, product]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (!userInteracted) {
            const isLikedItem = items?.find((item) => String(item.ProductId) === String(product.ProductId));
            setLiked(!!isLikedItem);
        } else {
            timer = setTimeout(() => {
                dispatch(postwishlistThunk(items));
                setUserInteracted(false);
            }, 1000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [items, userInteracted, dispatch]);

    return (
        <View>
            {authUser && (
                <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={30}
                    style={{ textAlign: 'right' }}
                    color={liked ? 'red' : 'black'}
                    onPress={handleWishlist}
                />
            )}
        </View>
    );
};

export default Liked;
