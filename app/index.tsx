import React, { useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import Categories from '@/components/Categories'
import { SafeAreaView, ScrollView, View } from 'react-native'
import FavProduct from '@/components/favProduct/FavProduct'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function Index() {
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