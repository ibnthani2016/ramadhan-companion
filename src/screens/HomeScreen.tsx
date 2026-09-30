// Home Screen - Main dashboard for Ramadan Companion

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { formatTime, formatRemaining, getNextPrayer } from '../services/PrayerTimesService';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { prayerTimes, currentLocation, requestLocationPermission, refreshPrayerTimes } = useApp();
  const [ramadanDay, setRamadanDay] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [countdown, setCountdown] = useState('');

  // Calculate current Ramadan day - dynamic based on current year
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    
    // Ramadan dates (approximate - actual dates depend on moon sighting)
    // Ramadan shifts ~11 days earlier each year
    const ramadanStartDates: Record<number, string> = {
      2024: '2024-03-10', // Ramadan 2024
      2025: '2025-02-28', // Ramadan 2025
      2026: '2026-02-17', // Ramadan 2026
      2027: '2027-02-06', // Ramadan 2027
      2028: '2028-01-26', // Ramadan 2028
    };
    
    const ramadanStartStr = ramadanStartDates[currentYear] || '2026-02-17';
    const ramadanStart = new Date(ramadanStartStr);
    const today = new Date();
    
    // Reset time to midnight for accurate day calculation
    ramadanStart.setHours(0, 0, 0, 0);
    const todayCopy = new Date(today);
    todayCopy.setHours(0, 0, 0, 0);
    
    const diffTime = todayCopy.getTime() - ramadanStart.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Set Ramadan day (1-30) or special values
    if (diffDays < 1) {
      setRamadanDay(-diffDays); // Show countdown
    } else if (diffDays > 30) {
      setRamadanDay(0); // Ramadan ended
    } else {
      setRamadanDay(diffDays);
    }
  }, []);

  // Request location on mount
  useEffect(() => {
    if (!currentLocation) {
      requestLocationPermission();
    }
  }, []);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (prayerTimes) {
        const next = getNextPrayer(prayerTimes);
        if (next) {
          setCountdown(formatRemaining(next.remaining));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const onRefresh = async () => {
    setRefreshing(true);
    refreshPrayerTimes();
    setRefreshing(false);
  };

  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null;

  const prayers = prayerTimes ? [
    { name: 'Fajr', time: prayerTimes.fajr, icon: 'moon-outline' as const },
    { name: 'Sunrise', time: prayerTimes.sunrise, icon: 'sunny-outline' as const },
    { name: 'Dhuhr', time: prayerTimes.dhuhr, icon: 'sunny' as const },
    { name: 'Asr', time: prayerTimes.asr, icon: 'partly-sunny-outline' as const },
    { name: 'Maghrib', time: prayerTimes.maghrib, icon: 'moon' as const },
    { name: 'Isha', time: prayerTimes.isha, icon: 'cloudy-night-outline' as const },
  ] : [];

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1E88E5']} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Assalamu Alaikum</Text>
          <Text style={styles.ramadanTitle}>Ramadan Mubarak</Text>
          <View style={styles.dayBadge}>
            <Text style={styles.dayText}>Day {ramadanDay} of 30</Text>
          </View>
        </View>
        <View style={styles.crescentContainer}>
          <Ionicons name="moon" size={60} color="#FFD700" />
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={16} color="#666" />
        <Text style={styles.locationText}>
          {currentLocation?.city || 'Location not set'}
        </Text>
        {!currentLocation && (
          <TouchableOpacity onPress={requestLocationPermission}>
            <Text style={styles.setLocationText}>Set Location</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Next Prayer Card */}
      {nextPrayer && (
        <View style={styles.nextPrayerCard}>
          <View style={styles.nextPrayerContent}>
            <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
            <Text style={styles.nextPrayerName}>{nextPrayer.name}</Text>
            <Text style={styles.nextPrayerTime}>{formatTime(nextPrayer.time)}</Text>
          </View>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownLabel}>In</Text>
            <Text style={styles.countdownTime}>{countdown}</Text>
          </View>
        </View>
      )}

      {/* Prayer Times List */}
      <View style={styles.prayerTimesContainer}>
        <Text style={styles.sectionTitle}>Today's Prayer Times</Text>
        <View style={styles.prayerList}>
          {prayers.map((prayer) => (
            <View 
              key={prayer.name} 
              style={[
                styles.prayerItem,
                nextPrayer?.name === prayer.name.toLowerCase() && styles.nextPrayerItem
              ]}
            >
              <View style={styles.prayerInfo}>
                <Ionicons name={prayer.icon} size={24} color="#1E88E5" />
                <Text style={styles.prayerName}>{prayer.name}</Text>
              </View>
              <Text style={styles.prayerTimeText}>{formatTime(prayer.time)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Quran')}>
            <View style={[styles.actionIcon, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="book" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>Read Quran</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Media')}>
            <View style={[styles.actionIcon, { backgroundColor: '#FF9800' }]}>
              <Ionicons name="play" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AppLock')}>
            <View style={[styles.actionIcon, { backgroundColor: '#9C27B0' }]}>
              <Ionicons name="lock-closed" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>App Lock</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('MemeGenerator')}>
            <View style={[styles.actionIcon, { backgroundColor: '#E91E63' }]}>
              <Ionicons name="images" size={24} color="#fff" />
            </View>
            <Text style={styles.actionText}>Meme</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1E88E5',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  ramadanTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  dayBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  dayText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  crescentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
  },
  locationText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  setLocationText: {
    marginLeft: 10,
    color: '#1E88E5',
    fontWeight: '600',
  },
  nextPrayerCard: {
    backgroundColor: '#1E88E5',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextPrayerContent: {
    flex: 1,
  },
  nextPrayerLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  nextPrayerName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  nextPrayerTime: {
    color: '#FFD700',
    fontSize: 18,
    marginTop: 5,
  },
  countdownContainer: {
    alignItems: 'flex-end',
  },
  countdownLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  countdownTime: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  prayerTimesContainer: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  prayerList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  prayerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  nextPrayerItem: {
    backgroundColor: '#E3F2FD',
  },
  prayerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerName: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  prayerTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
  },
  quickActions: {
    margin: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default HomeScreen;