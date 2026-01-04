import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../api/axios";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const glowAnim = React.useRef(new Animated.Value(0.5)).current;
  const twinkleAnims = React.useRef([]).current;

  // Create star animations
  useEffect(() => {
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      twinkleAnims[i] = new Animated.Value(Math.random() * 0.3 + 0.2);
    }

    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.8,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.5,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Start twinkling stars
    twinkleAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: Math.random() * 2000 + 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2,
            duration: Math.random() * 2000 + 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  // Generate random star positions
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        delay: Math.random() * 5,
      });
    }
    return stars;
  };

  const stars = generateStars();

  // ✅ LOGIN HANDLER - NO CHANGES
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setIsLoading(true);
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

      // 👉 Navigate to home/dashboard
      router.replace("/home");

    } catch (err) {
      console.log(err.response?.data);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000814" />

      {/* Animated Background */}
      <View style={styles.backgroundContainer}>
        {/* Deep Space Gradient */}
        <View style={styles.spaceGradient}>
          <View style={styles.deepSpace} />
          <Animated.View 
            style={[
              styles.nebulaGlow,
              {
                opacity: glowAnim,
                transform: [{
                  scale: glowAnim.interpolate({
                    inputRange: [0.5, 0.8],
                    outputRange: [1, 1.1]
                  })
                }]
              }
            ]} 
          />
        </View>

        {/* Twinkling Stars */}
        {stars.map((star, index) => (
          <Animated.View
            key={star.id}
            style={[
              styles.star,
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                opacity: twinkleAnims[index] || star.opacity,
              },
            ]}
          />
        ))}

        {/* Shooting Stars */}
        <View style={styles.shootingStarContainer}>
          <Animated.View style={[styles.shootingStar, styles.shootingStar1]} />
          <Animated.View style={[styles.shootingStar, styles.shootingStar2]} />
        </View>

        {/* Large Glowing Orbs */}
        <View style={[styles.orb, styles.orb1]} />
        <View style={[styles.orb, styles.orb2]} />
        <View style={[styles.orb, styles.orb3]} />
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your credentials to access your account</Text>
        </View>

        {/* Login Card */}
        <View style={styles.loginCard}>
          {/* Email Field */}
          <View style={styles.inputField}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View style={styles.inputLine} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
                selectionColor="#8b4dff"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputField}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputLine} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                selectionColor="#8b4dff"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.toggleIcon}>
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me & Forgot */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.rememberBox, rememberMe && styles.rememberBoxActive]}>
                {rememberMe && <View style={styles.rememberCheck} />}
              </View>
              <Text style={styles.rememberText}>Keep me logged in</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <View style={styles.buttonGlow} />
            <Text style={styles.loginButtonText}>
              {isLoading ? "AUTHENTICATING..." : "SIGN IN"}
            </Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>f</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Section */}
        <View style={styles.signupSection}>
          <Text style={styles.signupPrompt}>Don't have an account?</Text>
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => router.replace("/authentication/signup")}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
            <View style={styles.signupArrow}>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Decor */}
        <View style={styles.bottomDecor}>
          <View style={styles.decorLine} />
          <Text style={styles.decorText}>SECURE LOGIN</Text>
          <View style={styles.decorLine} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000814",
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  spaceGradient: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  deepSpace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000814",
  },
  // nebulaGlow: {
  //   position: "absolute",
  //   top: "30%",
  //   left: "50%",
  //   width: width * 1.5,
  //   height: width * 1.5,
  //   marginLeft: -(width * 0.75),
  //   backgroundColor: "rgba(74, 31, 112, 0.2)",
  //   borderRadius: width * 0.75,
  //   shadowColor: "#8b4dff",
  //   shadowOffset: { width: 0, height: 0 },
  //   shadowOpacity: 0.6,
  //   shadowRadius: 150,
  //   elevation: 10,
  // },
  // Star Particles
  star: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  shootingStarContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  shootingStar: {
    position: "absolute",
    backgroundColor: "#ffffff",
    height: 2,
    borderRadius: 1,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  shootingStar1: {
    width: 60,
    top: "20%",
    left: "10%",
    transform: [{ rotate: "45deg" }],
  },
  shootingStar2: {
    width: 40,
    top: "70%",
    left: "80%",
    transform: [{ rotate: "-30deg" }],
  },
  // Large Glowing Orbs
  orb: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.1,
  },
  orb1: {
    width: 200,
    height: 200,
    backgroundColor: "#ff6b6b",
    top: "10%",
    left: "10%",
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
  },
  orb2: {
    width: 150,
    height: 150,
    backgroundColor: "#4ecdc4",
    bottom: "20%",
    right: "15%",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
  },
  orb3: {
    width: 100,
    height: 100,
    backgroundColor: "#ffe66d",
    top: "60%",
    left: "70%",
    shadowColor: "#ffe66d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: -0.5,
    textShadowColor: "rgba(139, 77, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 24,
  },
  loginCard: {
    backgroundColor: "rgba(16, 8, 32, 0.85)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(139, 127, 168, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 10,
    marginBottom: 30,
    backdropFilter: "blur(10px)",
  },
  inputField: {
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    marginRight: 12,
  },
  inputLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(139, 127, 168, 0.2)",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 20, 50, 0.9)",
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    borderWidth: 1,
    borderColor: "rgba(139, 127, 168, 0.2)",
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 15,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  passwordToggle: {
    padding: 8,
  },
  toggleIcon: {
    fontSize: 20,
    color: "rgba(255,255,255,0.6)",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rememberBoxActive: {
    backgroundColor: "#8b4dff",
    borderColor: "#8b4dff",
  },
  rememberCheck: {
    width: 10,
    height: 10,
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
  rememberText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  forgotText: {
    color: "#b084ff",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#8b4dff",
    borderRadius: 16,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#8b4dff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  buttonArrow: {
    color: "#ffffff",
    fontSize: 20,
    marginLeft: 12,
    opacity: 0.8,
  },
  // divider: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 24,
  // },
  // dividerLine: {
  //   flex: 1,
  //   height: 1,
  //   backgroundColor: "rgba(139, 127, 168, 0.1)",
  // },
  // dividerText: {
  //   color: "rgba(255,255,255,0.4)",
  //   fontSize: 12,
  //   fontWeight: "600",
  //   marginHorizontal: 16,
  //   letterSpacing: 1,
  // },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 20, 50, 0.9)",
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(139, 127, 168, 0.2)",
  },
  socialIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 10,
  },
  socialText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "600",
  },
  signupSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  signupPrompt: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    marginBottom: 16,
  },
  signupButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(139, 77, 255, 0.4)",
    borderRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 14,
    shadowColor: "#8b4dff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  signupButtonText: {
    color: "#b084ff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  signupArrow: {
    marginLeft: 12,
    backgroundColor: "rgba(139, 77, 255, 0.3)",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    color: "#b084ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomDecor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  decorLine: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(139, 127, 168, 0.2)",
  },
  decorText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 2,
    marginHorizontal: 16,
  },
});