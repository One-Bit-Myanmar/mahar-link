import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth } from "../../firebaseConfig";

SplashScreen.preventAutoHideAsync();
const { height } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in:", userCredential.user);
      Alert.alert("Login Successful", "Welcome back!");
      router.push("../(tabs)/home");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Error", "Please check your Username or Password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <SafeAreaView className="bg-updatedBg h-full">
      <View className="w-full items-center min-h-[85vh]">
        <View style={styles.brandText} className="absolute top-3">
          <Text
            className="text-3xl font-bold text-left"
            style={{ fontWeight: "900" }}
          >
            <Text className="text-[#FEFEFE]">Maha</Text>
            <Text className="text-[#347928]"> Link</Text>
          </Text>
        </View>
        <View style={styles.contentWrapper}>
          {/* title  */}
          <Text
            className="text-3xl text-white font-bold text-center pb-4"
            style={{ color: "#347928" }}
          >
            Login
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your Email Address"
            keyboardType="email-address"
            placeholderTextColor="#999999"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#999999"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconWrapper}
            >
              <Icon
                name={isPasswordVisible ? "visibility-off" : "visibility"}
                size={20}
                color="#999999"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
              <Text style={styles.linkText}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  brandText: { width: "90%" },
  contentWrapper: { width: "90%", marginTop: height * 0.25 },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    paddingLeft: 20,
    borderRadius: 10,
    borderColor: "#347928",
  },
  passwordContainer: {
    height: 60,
    margin: 12,
    borderWidth: 2,
    paddingLeft: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#347928",
  },
  passwordInput: {
    flex: 1,
  },
  iconWrapper: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  customButton: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#347928",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FEFEFE",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomTextContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
  linkText: {
    color: "#347928",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Login;
