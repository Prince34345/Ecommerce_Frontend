import React from 'react'
import HeroBanner from '../components/HeroBanner'
import Categories from '@/components/Categories'
import { ScrollView, View } from 'react-native'
import FavProduct from '@/components/favProduct/FavProduct'


export default function Index() {
  return (
    <>
    <ScrollView>
      <HeroBanner/>
      <Categories />
      <FavProduct/>
     </ScrollView>
    </>
  )
}