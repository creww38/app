// src/components/LoadingScreen.js
import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  Animated,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const LoadingScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  
  useEffect(() => {
    // Animasi masuk
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Navigasi ke login setelah 3 detik
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ImageBackground
      source={require('../../assets/images/loading-screen.jpg')}
      style={styles.background}
      blurRadius={2}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LottieView
          source={require('../../assets/animations/scanner.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        
        <Text style={styles.title}>Sistem Absensi</Text>
        <Text style={styles.subtitle}>Digital Sekolah</Text>
        
        <View style={styles.loadingBar}>
          <Animated.View
            style={[
              styles.progress,
              {
                width: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  animation: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 50,
  },
  loadingBar: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default LoadingScreen;