import React, { useEffect, useRef } from 'react'
import { Dimensions,  Image,  View, Text, StyleSheet, FlatList, Animated, useWindowDimensions} from 'react-native'
import PagerView from 'react-native-pager-view'

const CarouselView = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const {width }  =  useWindowDimensions()

  return (
    <>
    <View style={styles.carouselView}>
       <FlatList
         // style={{width: width * 2}}
          nestedScrollEnabled={true}
          data={[... new Array(6)]}
          renderItem={( items ) => {
              return <>
              <View style={{height: 400 ,marginTop: 10 , width, cursor: "pointer" ,display: "flex", justifyContent:"center", alignItems:"center"}}>
                 <Image source={require("@/assets/images/tshirt.webp")} alt='4' style={{width: 250 ,resizeMode: "cover", flex:.8, alignSelf:"center"}}/>
              </View>
              </>
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          bounces
          
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
             useNativeDriver: false
          })}
       />
    </View>
    
    </>
  )
}

const styles = StyleSheet.create({
  carouselView: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  }
})


export default CarouselView
