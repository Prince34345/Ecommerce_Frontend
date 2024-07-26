import { View, Text, StyleSheet, TouchableOpacity,  Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useAuth } from '@/context/auth';

export default function App() {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  function handleLoginLogout(){
    console.log("auth", user)
     if(!user){
      router.push("/Login/")
     }else {
      signOut()
     }
  }
   return (
    <View style={styles.drawerContainer}>
      <View>
        <Ionicons name='close' onPress={() => navigation.goBack()} size={40} style={{ margin: 20 }} />
      </View>
      <View style={styles.header}>
       { user ? <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${user?.name}+&background=random`}} // Replace with your logo or avatar
          style={styles.avatar}
        /> : <Ionicons name='person-add' size={40}  /> }
        <Text style={styles.username}>{user?.name || 'guest'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.drawerItems}>
        <TouchableOpacity
          style={styles.drawerItem}
        >
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
        >
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.drawerText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
        >
          <Ionicons name="newspaper" size={24} color="black" />
          <Text style={styles.drawerText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => router.push('/wishlist/')}
        >
          <Ionicons name="heart" size={24} color="black" />
          <Text style={styles.drawerText}>Wishlist</Text>
        </TouchableOpacity>
      </View>

        <TouchableOpacity
          style={styles.footer}
          onPress={handleLoginLogout}
        >
          <Ionicons name="log-in-outline" size={40} color="black" />
          <Text style={styles.footerText}>{!user ? 'Login' : 'Logout'}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000',
  },
  drawerContainer: {
    flex: 1,
    width: "75%",
    paddingTop: 40,
    backgroundColor: "#f9f9f9",

  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3, 
    alignSelf: 'center',
    borderColor: '#fff',
  },
  username: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#9e9e9e'
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 20,
  },
  drawerItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  drawerText: {
    marginLeft: 15,
    color: 'black',
    fontSize: 16,
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20,
  },
});
