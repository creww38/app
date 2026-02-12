// src/components/SkeletonLoader.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonLoader = ({ type }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  const renderFeaturedSkeleton = () => (
    <View style={styles.featuredContainer}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.featuredItem}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.featuredAvatar,
              { opacity },
            ]}
          />
          <View style={styles.featuredContent}>
            <Animated.View
              style={[
                styles.skeleton,
                styles.featuredTitle,
                { opacity },
              ]}
            />
            <Animated.View
              style={[
                styles.skeleton,
                styles.featuredSubtitle,
                { opacity },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
  
  const renderStatsSkeleton = () => (
    <View style={styles.statsContainer}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.statItem}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.statCircle,
              { opacity },
            ]}
          />
          <Animated.View
            style={[
              styles.skeleton,
              styles.statText,
              { opacity },
            ]}
          />
        </View>
      ))}
    </View>
  );
  
  const renderActivitySkeleton = () => (
    <View style={styles.activityContainer}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.activityItem}>
          <Animated.View
            style={[
              styles.skeleton,
              styles.activityIcon,
              { opacity },
            ]}
          />
          <View style={styles.activityContent}>
            <Animated.View
              style={[
                styles.skeleton,
                styles.activityTitle,
                { opacity },
              ]}
            />
            <Animated.View
              style={[
                styles.skeleton,
                styles.activityTime,
                { opacity },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
  
  switch (type) {
    case 'featured':
      return renderFeaturedSkeleton();
    case 'stats':
      return renderStatsSkeleton();
    case 'activity':
      return renderActivitySkeleton();
    default:
      return (
        <View style={styles.container}>
          <Animated.View style={[styles.skeleton, styles.default, { opacity }]} />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  featuredContainer: {
    marginHorizontal: -5,
  },
  featuredItem: {
    width: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  featuredContent: {
    flex: 1,
  },
  featuredTitle: {
    width: '60%',
    height: 16,
    marginBottom: 8,
  },
  featuredSubtitle: {
    width: '40%',
    height: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  statText: {
    width: '80%',
    height: 14,
  },
  activityContainer: {
    marginTop: 10,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    width: '70%',
    height: 14,
    marginBottom: 6,
  },
  activityTime: {
    width: '50%',
    height: 12,
  },
  default: {
    width: '100%',
    height: 20,
    marginBottom: 10,
  },
});

export default SkeletonLoader;