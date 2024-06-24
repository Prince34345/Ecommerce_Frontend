import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { fetchCategory } from '@/store/slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useNavigation } from 'expo-router'
export default function Categories() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.category);
  const navigator = useNavigation()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch]);

  const arr = [...data]

  function handlePLP() {
    navigator.navigate('plp/index' as never)
  }


  return (
    <View>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{fontSize: 22 , margin: 5 ,fontWeight: 900}}>
              Shop for Categories
        </Text> 
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}><TouchableOpacity onPress={handlePLP}><Text style={{fontSize: 16, marginRight: 10, color: "#b0daa4", fontWeight: 900}}> View All </Text></TouchableOpacity></View>
      </View>
       {
        loading ?
      <View>
          {
              <Text>
                 loading...
              </Text>
          }
     </View>:
        <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false}  >
               {arr.map((data) => {
                   return <View key={data?.id} style={{margin: 10, backgroundColor: "grey", padding: 20, borderRadius: 5}}>
                     <TouchableOpacity>
                     <View>
                     <Text style={{color: "#b0eaa4", fontWeight: "bold"}}>
                                {data?.Category}
                        </Text>
                      </View>
                        </TouchableOpacity>
                  </View>
               })}
        </ScrollView>
}
    </View>
  )
}

