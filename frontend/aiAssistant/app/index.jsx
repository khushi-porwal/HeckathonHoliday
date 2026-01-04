import React, { useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useRouter} from "expo-router"
const { width, height } = Dimensions.get('window');

// 1. Individual Twinkling Star for the Background
const TwinklingStar = ({ style }) => {

  const opacity = useRef(new Animated.Value(Math.random())).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: Math.random() * 2000 + 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.1, duration: Math.random() * 2000 + 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={[styles.star, style, { opacity }]} />;
};

export default function App() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(0.5)).current;
    const router = useRouter();

  // Background Star Data
  const bgStars = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i, size: Math.random() * 2 + 1, x: Math.random() * width, y: Math.random() * height,
    }));
  }, []);

  useEffect(() => {
    // Orb Pulse & Float
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 2500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 2500, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -15, duration: 3000, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
        ]),
        // Internal Star Shimmer
        Animated.sequence([
          Animated.timing(shineAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
          Animated.timing(shineAnim, { toValue: 0.4, duration: 1500, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#05010a' }]} />
      
      {/* Background Layer */}
      {bgStars.map(s => <TwinklingStar key={s.id} style={{width: s.size, height: s.size, left: s.x, top: s.y}} />)}

      <View style={styles.content}>
        {/* Animated Orb with Shining Stars Inside */}
        <Animated.View style={[
          styles.orbContainer, 
          { transform: [{ scale: pulseAnim }, { translateY: floatAnim }] }
        ]}>
          <LinearGradient
            colors={['#c084fc', '#6366f1', '#fbbf24']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.orb}
          >
            {/* Shining Stars Layer */}
            <Animated.View style={{ opacity: shineAnim, alignItems: 'center', justifyContent: 'center' }}>
               <MaterialCommunityIcons name="sparkles" size={42} color="white" style={styles.centerStar} />
               <MaterialCommunityIcons name="star-four-points" size={14} color="white" style={styles.topRightStar} />
               <MaterialCommunityIcons name="star-four-points" size={10} color="white" style={styles.bottomLeftStar} />
            </Animated.View>
          </LinearGradient>
          <View style={styles.orbRing} />
        </Animated.View>

        {/* UI Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Ask{'\n'}anything</Text>
          <Text style={styles.subtitle}>Spark brilliance</Text>
          <Text style={styles.tagline}>Let AI elevate your craft.</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>router.push("/authentication/signup")} activeOpacity={0.8} style={styles.buttonWrapper}>
            <LinearGradient colors={['#2e1065', '#1e1b4b']} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={(()=>router.push("/authentication/login"))} activeOpacity={0.8} style={styles.buttonWrapper} >
            <LinearGradient colors={['#1e1b4b', '#0f172a']} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(192, 132, 252, 0.2)', 'rgba(99, 102, 241, 0.4)']}
        style={styles.bottomGlow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  star: { position: 'absolute', backgroundColor: '#fff', borderRadius: 5 },
  content: { zIndex: 10, alignItems: 'center', width: '100%' },
  orbContainer: { marginBottom: 60, alignItems: 'center', justifyContent: 'center' },
  orb: { 
    width: 120, height: 120, borderRadius: 60, 
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#c084fc', shadowRadius: 30, shadowOpacity: 1 
  },
  centerStar: { textShadowColor: '#fff', textShadowRadius: 15 },
  topRightStar: { position: 'absolute', top: -10, right: -10 },
  bottomLeftStar: { position: 'absolute', bottom: -5, left: -10 },
  orbRing: { 
    position: 'absolute', width: 160, height: 160, borderRadius: 80, 
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' 
  },
  textContainer: { alignItems: 'center', marginBottom: 50 },
  title: { fontSize: 56, color: '#fff', textAlign: 'center', fontWeight: '300' },
  subtitle: { fontSize: 18, color: '#94a3b8', marginTop: 15 },
  tagline: { fontSize: 15, color: '#64748b' },
  buttonContainer: { width: '85%', gap: 15 },
  buttonWrapper: { borderRadius: 30, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  button: { paddingVertical: 18, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  bottomGlow: { position: 'absolute', bottom: 0, width: '100%', height: 120 },
});