// Loading Components - Skeleton loaders and spinners
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ViewStyle } from 'react-native';

// Skeleton Loader - Animated placeholder while content loads
interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#e2e8f0',
          opacity,
        },
        style,
      ]}
    />
  );
};

// Skeleton Card - Placeholder for list items
export const SkeletonCard: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <Skeleton width={48} height={48} borderRadius={8} />
      <View style={styles.cardContent}>
        <Skeleton width="80%" height={16} />
        <Skeleton width="60%" height={12} style={{ marginTop: 8 }} />
      </View>
    </View>
  </View>
);

// Skeleton List - Multiple placeholder cards
interface SkeletonListProps {
  count?: number;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({ count = 5 }) => (
  <View>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </View>
);

// Loading Spinner
interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'large',
  color = '#1E88E5',
}) => (
  <View style={styles.spinnerContainer}>
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size === 'large' ? 40 : 24,
          height: size === 'large' ? 40 : 24,
          borderRadius: size === 'large' ? 20 : 12,
          borderWidth: size === 'large' ? 4 : 2,
          borderColor: color,
          borderTopColor: 'transparent',
        },
      ]}
    />
  </View>
);

// Full Screen Loading
interface FullScreenLoaderProps {
  message?: string;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  message = 'Loading...',
}) => (
  <View style={styles.fullScreen}>
    <Spinner size="large" />
    {message && <Animated.Text style={styles.loadingText}>{message}</Animated.Text>}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
});

export default {
  Skeleton,
  SkeletonCard,
  SkeletonList,
  Spinner,
  FullScreenLoader,
};
