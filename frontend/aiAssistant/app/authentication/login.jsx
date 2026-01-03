import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/axios";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ LOGIN HANDLER
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "All fields are required");
      console.log("Error", "All fields are required");
      return;
    }

    try {
      const res = await API.post("/login", {
        email: username,
        password: password,
      });

      const { token, user } = res.data;

      if (rememberMe) {
        await AsyncStorage.setItem("token", token);
      }

      Alert.alert("Success", "Login successful");
      console.log("User:", user);
      console.log("Success", "Login successful");

      // 👉 Navigate to home/dashboard
      router.replace("/home");

    } catch (err) {
      console.log(err.response?.data);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <View style={styles.content}>
        <Text style={styles.title}>Log In</Text>

        {/* Username / Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
        </View>

        {/* Remember & Forgot */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        {/* Signup Redirect */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => router.replace("/authentication/signup")}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e" },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 40 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ff3366",
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#16213e",
  },
  icon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, color: "#fff", fontSize: 16 },
  showText: { color: "#888", fontSize: 14 },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: { backgroundColor: "#ff3366", borderColor: "#ff3366" },
  checkmark: { color: "#fff", fontWeight: "bold" },
  rememberText: { color: "#fff" },
  forgotText: { color: "#ff3366" },

  loginBtn: {
    backgroundColor: "#ff3366",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  loginBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  signupContainer: { flexDirection: "row", justifyContent: "center" },
  signupText: { color: "#888" },
  signupLink: { color: "#ff3366", fontWeight: "bold" },
});
