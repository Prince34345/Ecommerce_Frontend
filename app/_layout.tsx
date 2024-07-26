import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { LogBox } from 'react-native';
import { AuthProvider } from '@/context/auth';

export default function HomeLayout() {
  LogBox.ignoreAllLogs(); 
  return (
    <AuthProvider>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Home/index" />
          <Stack.Screen name="Settings/index" options={{
            animation: "slide_from_left",
            presentation: "transparentModal",
          }}/>
          <Stack.Screen name="pdp/index" />
          <Stack.Screen name="cart/index" />
          <Stack.Screen name="plp/index" options={{ title: 'PLP' }} />
          <Stack.Screen name="checkout/index" options={{ title: 'Checkout' }} />
          <Stack.Screen name="Login/index" />
          <Stack.Screen name="Register/index" />
        </Stack>
      </Provider>
    </AuthProvider>
  );
}
