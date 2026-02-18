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
import { Audio } from 'expo-av';
import { useApp } from '../context/AppContext';
import { formatTime, getCurrentPrayer, getNextPrayer } from '../services/PrayerTimesService';
import { CalculationMethod } from '../types';

const PrayerTimesScreen: React.FC = () => {
  const { prayerTimes, settings, updateSettings, requestLocationPermission, currentLocation } = useApp();
  const [sound, setSound] = useState<any>(null);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);

  const calculationMethods: { value: CalculationMethod; label: string }[] = [
    { value: 'MWL', label: 'Muslim World League' },
    { value: 'ISNA', label: 'Islamic Society of North America' },
    { value: 'Egyptian', label: 'Egyptian General Authority' },
    { value: 'Makkah', label: 'Umm Al-Qura (Makkah)' },
    { value: 'Karachi', label: 'University of Islamic Sciences, Karachi' },
    { value: 'Tehran', label: 'Institute of Geophysics, Tehran' },
    { value: 'Jafari', label: 'Shia Ithna-Ashari, Leva Institute, Qum' },
  ];

  const playAdhan = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlayingAdhan(true);
      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlayingAdhan(false);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Could not play Adhan. Please check your internet connection.');
    }
  };

  const stopAdhan = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlayingAdhan(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1E88E5', padding: 20, paddingTop: 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  currentTimeCard: { backgroundColor: '#fff', margin: 15, borderRadius: 15, padding: 20, alignItems: 'center' },
  currentTimeLabel: { fontSize: 14, color: '#666' },
  currentTimeText: { fontSize: 48, fontWeight: 'bold', color: '#1E88E5', marginTop: 5 },
  currentPrayerText: { fontSize: 16, color: '#4CAF50', marginTop: 10, fontWeight: '600' },
  adhanCard: { backgroundColor: '#fff', marginHorizontal: 15, borderRadius: 15, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  adhanInfo: { flexDirection: 'row', alignItems: 'center' },
  adhanText: { marginLeft: 15 },
  adhanTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  adhanSubtitle: { fontSize: 14, color: '#666' },
  adhanButton: { backgroundColor: '#1E88E5', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25 },
  adhanButtonActive: { backgroundColor: '#E53935' },
  adhanButtonText: { color: '#fff', fontWeight: '600', marginLeft: 8 },
  prayerTimesList: { margin: 15, backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden' },
  prayerItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  currentPrayerItem: { backgroundColor: '#E8F5E9' },
  nextPrayerItem: { backgroundColor: '#E3F2FD' },
  prayerIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  prayerInfo: { flex: 1, marginLeft: 15 },
  prayerName: { fontSize: 18, fontWeight: '600', color: '#333' },
  prayerArabicName: { fontSize: 14, color: '#1E88E5', fontStyle: 'italic' },
  prayerTimeContainer: { alignItems: 'flex-end' },
  prayerTime: { fontSize: 20, fontWeight: 'bold', color: '#1E88E5' },
  nextBadge: { backgroundColor: '#1E88E5', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10, marginTop: 5 },
  nextBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  settingsSection: { margin: 15, backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  settingInfo: { flexDirection: 'row', alignItems: 'center' },
  settingLabel: { marginLeft: 12, fontSize: 16, color: '#333' },
  settingValue: { fontSize: 14, color: '#666', textAlign: 'right', maxWidth: '50%' },
});

export default PrayerTimesScreen;