import { useAuth } from "@/context/auth";
import { addItemToWishlist, getwishlistThunk } from "@/store/slices/wishlistSlice";
import { addAddress, getaddressThunk } from "@/store/slices/addressSlice";
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
      async function GetAddress() {
        const address = await dispatch(getaddressThunk() as any);
        const addressArr = address?.payload;
        console.log("addressArr", address)
        addressArr.forEach((item: any) => {
          dispatch(addAddress(item))
        })
      }
    GetWishlistItems();
     GetAddress()
    }
  }, [authUser, dispatch]);

  return <>{children}</>;
}

export default UserMetaDataProvider;
