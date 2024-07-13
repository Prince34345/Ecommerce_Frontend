import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Search from "../Search/Search";

export default function HeaderLayout() {
    const navigate = useNavigation()
    function handleCart() {
        navigate.navigate("cart/index" as never)
    }
    
    const { top } = useSafeAreaInsets()
    const marginTop = top > 0 ? top : 30 
    
    return (
         <View style={[styles.view, { marginTop }]}>
                <Ionicons name='menu' size={40} />
                <Search/>
                <Ionicons name='cart' size={40}  onPress={handleCart} />
                <View style={[styles.cartValue,{borderRadius: 5}]}>
                      <Text style={{textAlign: "center", fontWeight:"600" ,fontSize: 12 , color: "white"}}>
                          48
                      </Text>
                </View>
         </View>
    )
} 

const styles = StyleSheet.create({
    view: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 50
    },
    cartValue :{ 
        position: "absolute",
        height: 20, width: 20,
        backgroundColor: "#Ad9FA9",   
        right: 8, top: 3,
        display: "flex", justifyContent: "center", alignContent:"center"
    }
})