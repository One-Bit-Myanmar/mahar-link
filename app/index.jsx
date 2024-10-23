import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { Dimensions } from "react-native";
import { Link, useRouter } from "expo-router"; // Use the router from expo-router
import { Stack, useNavigation } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const { height } = Dimensions.get("window");

export default function App() {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView className="bg-updatedBg h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center min-h-[85vh]">
          <View style={styles.brandText} className="absolute top-3">
            <Text
              className="text-3xl font-bold text-left"
              style={{ fontWeight: "900" }}
            >
              <Text className="text-[#FEFEFE]">Maha</Text> {/* Color "Maha" */}
              <Text className="text-[#347928]"> Link</Text>
            </Text>
          </View>

          {/* Wrapper to align Text and Button */}
          <View style={styles.contentWrapper}>
            <Text
              className="text-4xl text-white font-bold text-left"
              style={{ lineHeight: 55, fontWeight: "900" }}
            >
              Seamless <Text style={{ color: "#347928" }}>Communication</Text>
              {"\n"}for rapid{"\n"}Emergency{"\n"}Response
            </Text>
            <CustomButton
              title="Go to Login"
              handlePress={() => router.push("/(auth)/Login")} 
              containerStyles="w-full mt-7 "
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#181716" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  brandText: {
    width: "80%",
  },
  contentWrapper: {
    width: "80%",
    marginTop: height * 0.4, // 30% of the screen height
  },
});