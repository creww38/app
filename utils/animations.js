import { Animated, Easing } from 'react-native';

export const fadeIn = (duration = 300) => {
  const opacity = new Animated.Value(0);
  
  Animated.timing(opacity, {
    toValue: 1,
    duration,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start();
  
  return opacity;
};

export const fadeOut = (duration = 300) => {
  const opacity = new Animated.Value(1);
  
  Animated.timing(opacity, {
    toValue: 0,
    duration,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start();
  
  return opacity;
};

export const slideInFromBottom = (duration = 400) => {
  const translateY = new Animated.Value(100);
  
  Animated.timing(translateY, {
    toValue: 0,
    duration,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    useNativeDriver: true,
  }).start();
  
  return { transform: [{ translateY }] };
};

export const slideOutToBottom = (duration = 400) => {
  const translateY = new Animated.Value(0);
  
  Animated.timing(translateY, {
    toValue: 100,
    duration,
    easing: Easing.bezier(0.55, 0.085, 0.68, 0.53),
    useNativeDriver: true,
  }).start();
  
  return { transform: [{ translateY }] };
};

export const scaleIn = (duration = 300) => {
  const scale = new Animated.Value(0.8);
  
  Animated.timing(scale, {
    toValue: 1,
    duration,
    easing: Easing.back(1.5),
    useNativeDriver: true,
  }).start();
  
  return { transform: [{ scale }] };
};

export const scaleOut = (duration = 300) => {
  const scale = new Animated.Value(1);
  
  Animated.timing(scale, {
    toValue: 0.8,
    duration,
    easing: Easing.back(1.5),
    useNativeDriver: true,
  }).start();
  
  return { transform: [{ scale }] };
};

export const rotate = (duration = 1000, infinite = false) => {
  const rotateValue = new Animated.Value(0);
  
  const animation = Animated.timing(rotateValue, {
    toValue: 1,
    duration,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  
  if (infinite) {
    Animated.loop(animation).start();
  } else {
    animation.start();
  }
  
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return { transform: [{ rotate }] };
};

export const shake = () => {
  const shakeValue = new Animated.Value(0);
  
  Animated.sequence([
    Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeValue, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(shakeValue, { toValue: 0, duration: 50, useNativeDriver: true }),
  ]).start();
  
  return { transform: [{ translateX: shakeValue }] };
};

export const pulse = (duration = 1000, infinite = true) => {
  const pulseValue = new Animated.Value(1);
  
  const animation = Animated.sequence([
    Animated.timing(pulseValue, {
      toValue: 1.1,
      duration: duration / 2,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
    Animated.timing(pulseValue, {
      toValue: 1,
      duration: duration / 2,
      easing: Easing.ease,
      useNativeDriver: true,
    }),
  ]);
  
  if (infinite) {
    Animated.loop(animation).start();
  } else {
    animation.start();
  }
  
  return { transform: [{ scale: pulseValue }] };
};

export const bounce = () => {
  const bounceValue = new Animated.Value(0);
  
  Animated.sequence([
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }),
    Animated.spring(bounceValue, {
      toValue: 0,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }),
  ]).start();
  
  const translateY = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });
  
  return { transform: [{ translateY }] };
};

export const stagger = (items, delay = 100) => {
  const animations = items.map((_, index) => {
    const opacity = new Animated.Value(0);
    const translateY = new Animated.Value(50);
    
    Animated.sequence([
      Animated.delay(index * delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    
    return {
      opacity,
      transform: [{ translateY }],
    };
  });
  
  return animations;
};

export const createHeaderScrollAnimation = (scrollY, headerHeight = 100) => {
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: 'clamp',
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.5, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });
  
  return {
    headerTranslateY,
    headerOpacity,
  };
};