import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../styles/colors';

const AnimatedHeader = ({ title, scrollY }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 60],
    extrapolate: 'clamp',
  });
  
  const titleSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [24, 18],
    extrapolate: 'clamp',
  });
  
  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Text style={[styles.title, { fontSize: titleSize }]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AnimatedHeader;