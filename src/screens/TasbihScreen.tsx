// Tasbih (Prayer Beads) Screen - Digital dhikr counter
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows, borderRadius } from '../theme';

const TASBIH_COUNT = 33; // Traditional count per set
const TOTAL_SETS = 3; // 3 sets of 33 = 99

const TasbihScreen: React.FC = () => {
  const [count, setCount] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animation when counting
  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Celebration animation when completing a set
  const animateComplete = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    if (isComplete) return;
    
    animatePress();
    Vibration.vibrate(10);
    
    const newCount = count + 1;
    const newTotal = totalCount + 1;
    
    if (newCount > TASBIH_COUNT) {
      // Reset for next set
      if (currentSet >= TOTAL_SETS) {
        // All sets complete!
        setCount(0);
        setCurrentSet(1);
        setTotalCount(0);
        setIsComplete(true);
        Vibration.vibrate([100, 50, 100]);
      } else {
        setCount(0);
        setCurrentSet(currentSet + 1);
        setTotalCount(newTotal);
        animateComplete();
        Vibration.vibrate(50);
      }
    } else {
      setCount(newCount);
      setTotalCount(newTotal);
    }
  };

  const resetTasbih = () => {
    setCount(0);
    setCurrentSet(1);
    setTotalCount(0);
    setIsComplete(false);
  };

  const progress = (count / TASBIH_COUNT) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="hardware-chip" size={48} color="#fff" />
        <Text style={styles.headerTitle}>Tasbih</Text>
        <Text style={styles.headerSubtitle}>Digital Dhikr Counter</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{currentSet}</Text>
          <Text style={styles.statLabel}>Set</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{count}</Text>
          <Text style={styles.statLabel}>Current</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{count} / {TASBIH_COUNT}</Text>
      </View>

      {/* Main Counter Button */}
      <Animated.View style={[styles.counterContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity 
          style={[
            styles.counterButton,
            isComplete && styles.counterButtonComplete
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isComplete ? "checkmark-circle" : "add"} 
            size={80} 
            color={isComplete ? "#4CAF50" : "#1E88E5"} 
          />
          <Text style={styles.counterText}>
            {isComplete ? "Complete!" : "Tap to Count"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Tasbih Types */}
      <View style={styles.typesContainer}>
        <Text style={styles.typesTitle}>Popular Dhikr</Text>
        <View style={styles.typesList}>
          {DHIKR_LIST.map((item, index) => (
            <TouchableOpacity key={index} style={styles.typeItem}>
              <Text style={styles.typeArabic}>{item.arabic}</Text>
              <Text style={styles.typeTranslation}>{item.translation}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetTasbih}>
        <Ionicons name="refresh" size={20} color="#666" />
        <Text style={styles.resetText}>Reset Counter</Text>
      </TouchableOpacity>
    </View>
  );
};

const DHIKR_LIST = [
  { arabic: "سُبْحَانَ الله", translation: "SubhanAllah" },
  { arabic: "الْحَمْدُ لِله", translation: "Alhamdullilah" },
  { arabic: "اللهُ أَكْبَرُ", translation: "Allahu Akbar" },
  { arabic: "لاَ إِلَهَ إِلاَّ الله", translation: "La ilaha illAllah" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    ...shadows.md,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.textOnPrimary,
    marginTop: spacing.sm,
  },
  headerSubtitle: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.xl,
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginTop: -spacing.lg,
    ...shadows.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressContainer: {
    margin: spacing.md,
    marginTop: spacing.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.divider,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  counterButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  counterButtonComplete: {
    borderColor: colors.success,
    backgroundColor: '#E8F5E9',
  },
  counterText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  typesContainer: {
    margin: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.sm,
  },
  typesTitle: {
    ...typography.h4,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  typesList: {
    gap: spacing.sm,
  },
  typeItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  typeArabic: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
  },
  typeTranslation: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  resetText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
});

export default TasbihScreen;
