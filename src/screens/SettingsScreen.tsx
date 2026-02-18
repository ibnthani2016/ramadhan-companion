// Settings Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CalculationMethod } from '../types';

const SettingsScreen: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const calculationMethods: { value: CalculationMethod; label: string }[] = [
    { value: 'MWL', label: 'Muslim World League' },
    { value: 'ISNA', label: 'Islamic Society of North America' },
    { value: 'Egyptian', label: 'Egyptian General Authority' },
    { value: 'Makkah', label: 'Umm Al-Qura (Makkah)' },
    { value: 'Karachi', label: 'University of Islamic Sciences, Karachi' },
    { value: 'Tehran', label: 'Institute of Geophysics, Tehran' },
    { value: 'Jafari', label: 'Shia Ithna-Ashari, Leva Institute, Qum' },
  ];

  const handleMethodChange = () => {
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

  const toggleNotifications = (value: boolean) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        fajr: value,
        dhuhr: value,
        asr: value,
        maghrib: value,
        isha: value,
      },
    });
  };

  const notificationsEnabled = settings.notifications.fajr || settings.notifications.dhuhr || 
    settings.notifications.asr || settings.notifications.maghrib || settings.notifications.isha;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={48} color="#fff" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prayer Settings</Text>
        <TouchableOpacity style={styles.item} onPress={handleMethodChange}>
          <Text style={styles.label}>Calculation Method</Text>
          <Text style={styles.value}>
            {calculationMethods.find(m => m.value === settings.calculationMethod)?.label || 'MWL'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.item}>
          <Text style={styles.label}>Prayer Notifications</Text>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.version}>Ramadan Companion v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1E88E5', padding: 30, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  section: { margin: 15, backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  label: { fontSize: 16, color: '#333' },
  value: { fontSize: 14, color: '#666' },
  version: { fontSize: 14, color: '#666', padding: 15, textAlign: 'center' },
});

export default SettingsScreen;