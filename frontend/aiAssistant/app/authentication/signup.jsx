import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import API from "../api/axios";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Initial fade in animation
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulsing glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      shakeAnimation();
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      shakeAnimation();
      return;
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "Please accept Terms & Conditions");
      shakeAnimation();
      return;
    }

    setIsLoading(true);
    
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const res = await API.post("/signup", {
        name: fullName,
        email,
        password,
      });

      Alert.alert("Success", "Account created successfully");
      router.replace("/authentication/login");
    } catch (err) {
      console.log(err.response?.data);
      Alert.alert(
        "Signup Failed",
        err.response?.data?.message || "Try again"
      );
      shakeAnimation();
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { key: "fullName", placeholder: "Full Name", value: fullName, onChange: setFullName, autoCapitalize: "words" },
    { key: "email", placeholder: "Email", value: email, onChange: setEmail, keyboardType: "email-address", autoCapitalize: "none" },
  ];

  const passwordFields = [
    { 
      key: "password", 
      placeholder: "Password", 
      value: password, 
      onChange: setPassword,
      showPassword,
      setShowPassword,
      secureTextEntry: !showPassword
    },
    { 
      key: "confirmPassword", 
      placeholder: "Confirm Password", 
      value: confirmPassword, 
      onChange: setConfirmPassword,
      showPassword: showConfirmPassword,
      setShowPassword: setShowConfirmPassword,
      secureTextEntry: !showConfirmPassword
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0014" />

      {/* Animated Cosmic Background */}
      <View style={styles.backgroundContainer}>
        <View style={styles.starsBackground} />
        <Animated.View 
          style={[
            styles.glowEffect,
            {
              opacity: glowAnim,
              transform: [
                { scale: glowAnim.interpolate({
                  inputRange: [0.3, 0.6],
                  outputRange: [1, 1.1]
                })}
              ]
            }
          ]} 
        />
        <View style={styles.starsOverlay}>
          {[...Array(50)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.star,
                {
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  opacity: Math.random() * 0.7 + 0.3,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}]
              }
            ]}
          >
            {/* Welcome Header with animation */}
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back 👋</Text>
              <Text style={styles.subtitle}>Create your account to continue</Text>
            </View>

            {/* Form Container with floating effect */}
            <Animated.View 
              style={[
                styles.formContainer,
                {
                  transform: [{ translateY: shakeAnim }]
                }
              ]}
            >
              {/* Regular Input Fields */}
              {inputFields.map((field) => (
                <TouchableOpacity
                  key={field.key}
                  activeOpacity={1}
                  style={styles.inputWrapper}
                  onPress={() => setActiveInput(field.key)}
                >
                  <TextInput
                    style={[
                      styles.input,
                      activeInput === field.key && styles.inputActive
                    ]}
                    placeholder={field.placeholder}
                    placeholderTextColor="#8b7fa8"
                    value={field.value}
                    onChangeText={field.onChange}
                    onFocus={() => setActiveInput(field.key)}
                    onBlur={() => setActiveInput(null)}
                    keyboardType={field.keyboardType}
                    autoCapitalize={field.autoCapitalize}
                  />
                  {field.value && (
                    <Animated.View style={styles.inputIndicator}>
                      <View style={styles.inputDot} />
                    </Animated.View>
                  )}
                </TouchableOpacity>
              ))}

              {/* Password Fields with enhanced eye toggle */}
              {passwordFields.map((field) => (
                <TouchableOpacity
                  key={field.key}
                  activeOpacity={1}
                  style={styles.inputWrapper}
                  onPress={() => setActiveInput(field.key)}
                >
                  <TextInput
                    style={[
                      styles.input,
                      activeInput === field.key && styles.inputActive
                    ]}
                    placeholder={field.placeholder}
                    placeholderTextColor="#8b7fa8"
                    value={field.value}
                    onChangeText={field.onChange}
                    onFocus={() => setActiveInput(field.key)}
                    onBlur={() => setActiveInput(null)}
                    secureTextEntry={field.secureTextEntry}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => field.setShowPassword(!field.showPassword)}
                  >
                    <Animated.View style={styles.eyeIconContainer}>
                      <Text style={styles.eyeIcon}>
                        {field.showPassword ? "👁️" : "•••"}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                  {field.value && (
                    <View style={styles.passwordStrength}>
                      <View style={[
                        styles.strengthBar,
                        field.value.length >= 8 && styles.strengthGood,
                        field.value.length >= 12 && styles.strengthExcellent
                      ]} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}

              {/* Enhanced Terms Checkbox */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setAgreeToTerms(!agreeToTerms);
                  // Checkbox animation
                  Animated.spring(new Animated.Value(agreeToTerms ? 1 : 0), {
                    toValue: agreeToTerms ? 0 : 1,
                    useNativeDriver: true,
                  }).start();
                }}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={[
                    styles.checkbox,
                    agreeToTerms && styles.checkboxChecked,
                  ]}
                >
                  {agreeToTerms && (
                    <Animated.Text style={styles.checkmark}>✓</Animated.Text>
                  )}
                </Animated.View>
                <Text style={styles.termsText}>
                  I agree to the{" "}
                  <TouchableOpacity onPress={() => Alert.alert("Terms & Conditions", "Here would be your terms and conditions content.")}>
                    <Text style={styles.linkText}>Terms & Conditions</Text>
                  </TouchableOpacity>
                </Text>
              </TouchableOpacity>

              {/* Animated Sign Up Button */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                  style={[
                    styles.signupBtn,
                    isLoading && styles.signupBtnDisabled
                  ]} 
                  onPress={handleSignup}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <View style={styles.gradientButton}>
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <Animated.View style={styles.loadingDot} />
                        <Animated.View style={[styles.loadingDot, { animationDelay: '0.2s' }]} />
                        <Animated.View style={[styles.loadingDot, { animationDelay: '0.4s' }]} />
                      </View>
                    ) : (
                      <Text style={styles.signupBtnText}>Sign Up</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* Login Redirect with hover effect */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => router.push("/authentication/login")}
                  style={styles.loginLinkContainer}
                >
                  <Text style={styles.loginLink}> Sign In</Text>
                  <View style={styles.loginLinkUnderline} />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Glow with animation */}
      <Animated.View 
        style={[
          styles.bottomGlow,
          {
            opacity: glowAnim,
          }
        ]} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0014",
  },
  keyboardAvoid: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  starsBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#0a0014",
    opacity: 1,
  },
  starsOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  star: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  glowEffect: {
    position: "absolute",
    top: "30%",
    left: "50%",
    width: 300,
    height: 300,
    marginLeft: -150,
    backgroundColor: "#4a1f70",
    borderRadius: 150,
    shadowColor: "#8b4dff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: 0.5,
    textShadowColor: "rgba(139, 77, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#8b7fa8",
    fontWeight: "400",
  },
  formContainer: {
    backgroundColor: "rgba(10, 0, 20, 0.4)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(139, 127, 168, 0.1)",
    shadowColor: "#8b4dff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "rgba(30, 20, 50, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(139, 127, 168, 0.2)",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: "#ffffff",
    fontSize: 15,
    height: 56,
    paddingRight: 50,
  },
  inputActive: {
    borderColor: "#8b4dff",
    shadowColor: "#8b4dff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  inputIndicator: {
    position: "absolute",
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  inputDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8b4dff",
  },
  eyeButton: {
    position: "absolute",
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
  eyeIconContainer: {
    padding: 5,
  },
  eyeIcon: {
    fontSize: 16,
    color: "#8b7fa8",
  },
  passwordStrength: {
    position: "absolute",
    bottom: -8,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: "rgba(139, 127, 168, 0.2)",
    borderRadius: 1,
    overflow: "hidden",
  },
  strengthBar: {
    height: "100%",
    width: "0%",
    backgroundColor: "#ff4444",
  },
  strengthGood: {
    width: "50%",
    backgroundColor: "#ffaa00",
  },
  strengthExcellent: {
    width: "100%",
    backgroundColor: "#00ff88",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
    paddingVertical: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#8b7fa8",
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#8b4dff",
    borderColor: "#8b4dff",
  },
  checkmark: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  termsText: {
    color: "#8b7fa8",
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
  linkText: {
    color: "#b084ff",
    fontWeight: "600",
  },
  signupBtn: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  signupBtnDisabled: {
    opacity: 0.7,
  },
  gradientButton: {
    backgroundColor: "#8b4dff",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8b4dff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  signupBtnText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginHorizontal: 3,
    opacity: 0.7,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#8b7fa8",
    fontSize: 14,
  },
  loginLinkContainer: {
    position: "relative",
  },
  loginLink: {
    color: "#b084ff",
    fontWeight: "700",
    fontSize: 14,
  },
  loginLinkUnderline: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#b084ff",
    opacity: 0,
  },
  // bottomGlow: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: "50%",
  //   width: 400,
  //   height: 100,
  //   marginLeft: -200,
  //   backgroundColor: "#8b4dff",
  //   borderRadius: 200,
  //   shadowColor: "#8b4dff",
  //   shadowOffset: { width: 0, height: -30 },
  //   shadowOpacity: 0.8,
  //   shadowRadius: 60,
  //   elevation: 15,
  // },
});