import React from 'react'
import HeroBanner from '../../components/HeroBanner'
import Categories from '@/components/Categories'
import { SafeAreaView, ScrollView } from 'react-native'
import FavProduct from '@/components/FavProduct/index'
import HeaderLayout from '@/components/Header/Header'

export default function Index() {
  return (
    <SafeAreaView>
     <HeaderLayout />
      <ScrollView>
        <HeroBanner/>
        <Categories />
        <FavProduct />
      </ScrollView>
    </SafeAreaView>
  )
}