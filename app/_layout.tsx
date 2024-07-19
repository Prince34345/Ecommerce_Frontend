import store from '@/store/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Header from '../components/Header/Header'
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Header/>
      <Stack screenOptions={{
        headerShown: false
       }}
       >
        <Stack.Screen name="index" options={{
          title: "Home"
        }} />
        <Stack.Screen name="pdp/index"/>
        <Stack.Screen name="plp/index" options={{
          title: "PLP"
        }}/>
        <Stack.Screen name="cart/index" options={{
          title: "cart"
        }}/>
      </Stack>
    </Provider>
  );
}
