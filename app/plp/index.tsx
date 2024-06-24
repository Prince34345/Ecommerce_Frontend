import { View, Text, ScrollView } from 'react-native'
import React from 'react'

export default function Page() {
  
  return (
    <ScrollView>
           <View>
               <Text style={{fontSize: 22, fontWeight: "bold", textAlign:"center", margin: 15}}>Product's</Text>
           </View>
           
    </ScrollView>
  )
}