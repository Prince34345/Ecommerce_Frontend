// NotAuthenticated.tsx

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

const NotAuthenticated: React.FC = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are not authenticated</Text>
      <Text style={styles.subtitle}>Please login to access this feature</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/Login/')}>
        <Text style={{color: 'white', fontSize: 20}}>Login</Text>  
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    margin: '75%',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 25,
    paddingHorizontal: 40,
    borderRadius: 25
  },
});

export default NotAuthenticated;
