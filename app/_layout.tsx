import store from '@/store/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Header from '../components/Header/Header'
import { StatusBar } from 'react-native';

export default function RootLayout() {
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
        <Stack.Screen name="plp/index" options={{
          title: "PLP"
        }}/>
         <Stack.Screen name="pdp/index" options={{
          title: "PDP"
        }}/>
      </Stack>
    </Provider>
  );
}
