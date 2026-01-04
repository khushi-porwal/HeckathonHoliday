import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

export default function IntroScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* GLOWING ORB WITH RINGS */}
      <View style={styles.orbContainer}>
        {/* Outer glow rings */}
        <View style={styles.glowRing1} />
        <View style={styles.glowRing2} />
        <View style={styles.glowRing3} />
        
        {/* Main orb */}
        <LinearGradient
          colors={["#a78bfa", "#ec4899", "#fbbf24"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.orb}
        >
          <View style={styles.innerGlow}>
            <Text style={styles.sparkles}>✨</Text>
          </View>
        </LinearGradient>
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.askText}>Ask</Text>
        <Text style={styles.anythingText}>anything</Text>
      </View>

      <Text style={styles.subtitle}>
        Spark brilliance{'\n'}Let AI elevate your craft.
      </Text>

      {/* PAGINATION DOTS */}
      <View style={styles.dotsContainer}>
        <View style={styles.dotInactive} />
        <View style={styles.dotActive} />
        <View style={styles.dotInactive} />
        <View style={styles.dotInactive} />
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push("/authentication/signup")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push("/authentication/login")}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* BOTTOM GLOW */}
      <LinearGradient
        colors={["transparent", "rgba(168, 85, 247, 0.3)", "rgba(236, 72, 153, 0.3)"]}
        style={styles.bottomGlow}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  orbContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    width: 220,
    height: 220,
  },

  glowRing1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    backgroundColor: 'transparent',
  },

  glowRing2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
    backgroundColor: 'transparent',
  },

  glowRing3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },

  orb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#a78bfa",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },

  innerGlow: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  sparkles: {
    fontSize: 40,
  },

  textContainer: {
    alignItems: "center",
    marginBottom: 12,
  },

  askText: {
    color: "#ffffff",
    fontSize: 52,
    fontWeight: "300",
    letterSpacing: 0.5,
  },

  anythingText: {
    color: "#ffffff",
    fontSize: 52,
    fontWeight: "300",
    letterSpacing: 0.5,
    marginTop: -10,
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    fontWeight: "400",
  },

  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },

  dotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#374151",
    marginHorizontal: 4,
  },

  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginHorizontal: 4,
  },

  buttonsContainer: {
    width: "100%",
    maxWidth: 400,
  },

  button: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 12,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    width: width,
  },
});