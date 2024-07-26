import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Search from "../Search/Search";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigation } from "@react-navigation/native";

export default function HeaderLayout() {
    const router = useRouter()
    const navigator = useNavigation()
    const data =  useSelector((state: RootState) => state.cart)
    function handleCart() {
        navigator.navigate("cart/index" as never)
    }
    
    const { top } = useSafeAreaInsets()
    const marginTop = top > 0 ? top : 30 
    
    return (
         <View style={[styles.view, { marginTop }]}>
                <Ionicons name='menu' size={40} onPress={() => router.push("/Settings")}/>
                <Search/>
                <Ionicons name='cart' size={40}  onPress={handleCart} />
               {data.totalQuantity > 0 ? <View style={[styles.cartValue,{borderRadius: 5}]}>
                      <Text style={{textAlign: "center", fontWeight:"600" ,fontSize: 12 , color: "white"}}>
                          {data.totalQuantity}
                      </Text>
                </View> : <></>
               } 
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