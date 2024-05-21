import {CartProvider} from '@/components/provider';
import { Stack } from 'expo-router';


export default function RootLayoutNav() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}
