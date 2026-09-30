// Prayer Times Screen - Detailed prayer times with Adhan player

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useApp } from '../context/AppContext';
import { formatTime, getCurrentPrayer, getNextPrayer } from '../services/PrayerTimesService';
import { CalculationMethod } from '../types';
import { colors, spacing, typography, shadows, borderRadius } from '../theme';

const ADHAN_URL = 'https://www.islamcan.com/audio/adhan/azan1.mp3';

const PrayerTimesScreen: React.FC = () => {
  const { prayerTimes, settings, updateSettings, requestLocationPermission, currentLocation } = useApp();

  // Modern expo-audio hook — manages the native player lifecycle automatically
  const player = useAudioPlayer(ADHAN_URL);
  const status = useAudioPlayerStatus(player);
  const isPlayingAdhan = status.playing;

  const calculationMethods: { value: CalculationMethod; label: string }[] = [
    { value: 'MWL', label: 'Muslim World League' },
    { value: 'ISNA', label: 'Islamic Society of North America' },
    { value: 'Egyptian', label: 'Egyptian General Authority' },
    { value: 'Makkah', label: 'Umm Al-Qura (Makkah)' },
    { value: 'Karachi', label: 'University of Islamic Sciences, Karachi' },
    { value: 'Tehran', label: 'Institute of Geophysics, Tehran' },
    { value: 'Jafari', label: 'Shia Ithna-Ashari, Leva Institute, Qum' },
  ];

  const playAdhan = () => {
    try {
      player.seekTo(0);
      player.play();
    } catch {
      Alert.alert('Error', 'Could not play Adhan. Please check your internet connection.');
    }
  };

  const stopAdhan = () => {
    player.pause();
    player.seekTo(0);
  };

  const changeCalculationMethod = () => {
    Alert.alert(
      'Calculation Method',
      'Choose a calculation method:',
      calculationMethods.map(method => ({
        text: method.label,
        onPress: () => updateSettings({ calculationMethod: method.value }),
      })),
      { cancelable: true }
    );
  };

  const currentPrayer = prayerTimes ? getCurrentPrayer(prayerTimes) : null;
  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null;

  const prayers = prayerTimes ? [
    { name: 'Fajr', arabicName: 'Al-Fajr', time: prayerTimes.fajr, icon: 'moon-outline' as const },
    { name: 'Sunrise', arabicName: 'Ash-Shurooq', time: prayerTimes.sunrise, icon: 'sunny-outline' as const },
    { name: 'Dhuhr', arabicName: 'Adh-Dhuhr', time: prayerTimes.dhuhr, icon: 'sunny' as const },
    { name: 'Asr', arabicName: 'Al-Asr', time: prayerTimes.asr, icon: 'partly-sunny-outline' as const },
    { name: 'Maghrib', arabicName: 'Al-Maghrib', time: prayerTimes.maghrib, icon: 'moon' as const },
    { name: 'Isha', arabicName: 'Al-Isha', time: prayerTimes.isha, icon: 'cloudy-night-outline' as const },
  ] : [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Prayer Times</Text>
        <Text style={styles.headerSubtitle}>{currentLocation?.city || 'Set your location'}</Text>
      </View>

      <View style={styles.currentTimeCard}>
        <Text style={styles.currentTimeLabel}>Current Time</Text>
        <Text style={styles.currentTimeText}>
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </Text>
        {currentPrayer && <Text style={styles.currentPrayerText}>Current: {currentPrayer}</Text>}
      </View>

      <View style={styles.adhanCard}>
        <View style={styles.adhanInfo}>
          <Ionicons name="musical-notes" size={32} color="#1E88E5" />
          <View style={styles.adhanText}>
            <Text style={styles.adhanTitle}>Adhan</Text>
            <Text style={styles.adhanSubtitle}>Call to Prayer</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.adhanButton, isPlayingAdhan && styles.adhanButtonActive]}
          onPress={isPlayingAdhan ? stopAdhan : playAdhan}
        >
          <Ionicons name={isPlayingAdhan ? 'stop' : 'play'} size={24} color="#fff" />
          <Text style={styles.adhanButtonText}>{isPlayingAdhan ? 'Stop' : 'Play'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.prayerTimesList}>
        {prayers.map((prayer) => (
          <View
            key={prayer.name}
            style={[
              styles.prayerItem,
              currentPrayer === prayer.name.toLowerCase() && styles.currentPrayerItem,
              nextPrayer?.name === prayer.name.toLowerCase() && styles.nextPrayerItem,
            ]}
          >
            <View style={styles.prayerIconContainer}>
              <Ionicons name={prayer.icon} size={28} color="#1E88E5" />
            </View>
            <View style={styles.prayerInfo}>
              <Text style={styles.prayerName}>{prayer.name}</Text>
              <Text style={styles.prayerArabicName}>{prayer.arabicName}</Text>
            </View>
            <View style={styles.prayerTimeContainer}>
              <Text style={styles.prayerTime}>{formatTime(prayer.time)}</Text>
              {nextPrayer?.name === prayer.name.toLowerCase() && (
                <View style={styles.nextBadge}>
                  <Text style={styles.nextBadgeText}>NEXT</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem} onPress={changeCalculationMethod}>
          <View style={styles.settingInfo}>
            <Ionicons name="calculator" size={24} color="#1E88E5" />
            <Text style={styles.settingLabel}>Calculation Method</Text>
          </View>
          <Text style={styles.settingValue}>
            {calculationMethods.find(m => m.value === settings.calculationMethod)?.label}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={requestLocationPermission}>
          <View style={styles.settingInfo}>
            <Ionicons name="location" size={24} color="#1E88E5" />
            <Text style={styles.settingLabel}>Location</Text>
          </View>
          <Text style={styles.settingValue}>{currentLocation?.city || 'Not set'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: spacing.lg, paddingTop: 50, borderBottomLeftRadius: borderRadius.xl, borderBottomRightRadius: borderRadius.xl, ...shadows.md },
  headerTitle: { ...typography.h1, color: colors.textOnPrimary },
  headerSubtitle: { ...typography.body, color: 'rgba(255,255,255,0.8)', marginTop: spacing.xs },
  currentTimeCard: { backgroundColor: colors.surface, margin: spacing.md, borderRadius: borderRadius.xl, padding: spacing.lg, alignItems: 'center', ...shadows.md },
  currentTimeLabel: { ...typography.caption, color: colors.textSecondary },
  currentTimeText: { fontSize: 48, fontWeight: 'bold', color: colors.primary, marginTop: spacing.xs },
  currentPrayerText: { ...typography.body, color: colors.success, marginTop: spacing.sm, fontWeight: '600' },
  adhanCard: { backgroundColor: colors.surface, marginHorizontal: spacing.md, borderRadius: borderRadius.xl, padding: spacing.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...shadows.md },
  adhanInfo: { flexDirection: 'row', alignItems: 'center' },
  adhanText: { marginLeft: spacing.md },
  adhanTitle: { ...typography.h3, color: colors.text },
  adhanSubtitle: { ...typography.caption, color: colors.textSecondary },
  adhanButton: { backgroundColor: colors.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderRadius: borderRadius.full },
  adhanButtonActive: { backgroundColor: colors.error },
  adhanButtonText: { color: colors.textOnPrimary, fontWeight: '600', marginLeft: spacing.sm },
  prayerTimesList: { margin: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.xl, overflow: 'hidden', ...shadows.sm },
  prayerItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  currentPrayerItem: { backgroundColor: '#E8F5E9' },
  nextPrayerItem: { backgroundColor: '#E3F2FD' },
  prayerIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  prayerInfo: { flex: 1, marginLeft: spacing.md },
  prayerName: { ...typography.h4, color: colors.text },
  prayerArabicName: { ...typography.caption, color: colors.primary, fontStyle: 'italic' },
  prayerTimeContainer: { alignItems: 'flex-end' },
  prayerTime: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
  nextBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: borderRadius.sm, marginTop: spacing.xs },
  nextBadgeText: { color: colors.textOnPrimary, fontSize: 10, fontWeight: 'bold' },
  settingsSection: { margin: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.xl, overflow: 'hidden', ...shadows.sm },
  sectionTitle: { ...typography.h3, color: colors.text, padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  settingInfo: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { marginLeft: spacing.md, ...typography.body, color: colors.text },
  settingValue: { ...typography.caption, color: colors.textSecondary, textAlign: 'right', maxWidth: '50%' },
});

export default PrayerTimesScreen;