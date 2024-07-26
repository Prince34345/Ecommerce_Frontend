import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, Text, StyleSheet, ImageBackground } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/your-background-image.jpg' }} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>WELCOME TO OUR SHOP</Text>
        <Pressable style={styles.button} onPress={() => router.push('/Home')}>
          <Text style={styles.buttonText}>Shop Now</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
