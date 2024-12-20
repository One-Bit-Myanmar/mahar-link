import { StyleSheet, Text, View } from "react-native";
import {React, useEffect} from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="screens/OrgScreen/OrgListScreen" options={{ title: 'Organizations' }} />
      <Stack.Screen name="screens/OrgScreen/OrgDetailScreen" options={{ title: 'Organization Detail' }} />
      <Stack.Screen 
        name="screens/ChatScreen/ChattingScreen" 
        options={({ route }) => ({ title: route.params?.chatTitle || 'Chat' })} 
      />
      <Stack.Screen name="screens/ChatScreen/GlobalChatScreen" options={{ title: 'Global Chat' }} />
      <Stack.Screen name="screens/ChatScreen/GroupChatScreen" options={{ title: 'Group Chat' }} />
      <Stack.Screen name="screens/NotificationScreen/NotificationCenterScreen" options={{ title: 'Notifications' }} />
      <Stack.Screen name="screens/PinnedLocationScreen/PinnedLocationListScreen" options={{ title: 'Pinned Locations' }} />

      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/Login" options={{ headerShown: false }} />

    </Stack>
  );
};

export default RootLayout;
