import React from 'react'
import HeroBanner from '../components/HeroBanner'
import Categories from '@/components/Categories'
import { SafeAreaView, ScrollView, View } from 'react-native'
import FavProduct from '@/components/favProduct/FavProduct'
import { useRouter } from 'expo-router'


export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <ScrollView>
        <HeroBanner/>
        <Categories />
        <FavProduct />
      </ScrollView>
    </SafeAreaView>
  )
}