import { useAuth } from "@/context/auth";
import { addItemToWishlist, getwishlistThunk } from "@/store/slices/wishlistSlice";
import { AppDispatch } from "@/store/store";
import React, { useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";

function UserMetaDataProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { authUser } = useAuth();
  
  useEffect(() => {
    if (authUser) {
      async function GetWishlistItems() {
        const wishlistItems = await dispatch(getwishlistThunk());
        const wishlistArr = wishlistItems?.payload;
        wishlistArr.forEach((item: any) => {
          dispatch(addItemToWishlist(item));
        });
      }
      GetWishlistItems();
    }
  }, [authUser, dispatch]);

  return <>{children}</>;
}

export default UserMetaDataProvider;
