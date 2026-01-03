import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {useRouter} from "expo-router"
export default function IntroScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* GLOW ORB */}
      <View style={styles.center}>
         <LinearGradient
          colors={["#ff2b6a", "#7d4cff", "#00d4ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.orb}
        >
        <Image source={require("../assets/images/logo.jpeg")}
        style={{width:120,height:120, borderRadius:50}}
        />
        </LinearGradient>

      </View>

      {/* TEXT */}
      <Text style={styles.bigText}>Ask</Text>
      <Text style={styles.bigText}>anything</Text>

      <Text style={styles.sub}>
        Spark brilliance{`\n`}Let AI elevate your craft.
      </Text>

      {/* DOTS */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* BUTTONS */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/authentication/signup")}
      >
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { marginTop: 12 }]}
        onPress={() => router.push("/authentication/login")}
      >
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    alignItems: "center",
    marginBottom: 20,
  },

  orb: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  star: {
    fontSize: 40,
    color: "white",
  },

  bigText: {
    color: "white",
    fontSize: 38,
    fontWeight: "700",
    letterSpacing: 1,
  },

  sub: {
    color: "#bfbfbf",
    textAlign: "center",
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
  },

  dots: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "#555",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
  },

  btn: {
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 5,
  },

  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});