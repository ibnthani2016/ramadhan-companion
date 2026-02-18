// App Lock Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLockConfig, enableAppLock, disableAppLock } from '../services/AppLockService';

const AppLockScreen: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');

  const toggleLock = async () => {
    if (enabled) {
      // Ask for PIN before disabling
      Alert.alert(
        'Disable App Lock',
        'Enter your PIN to disable app lock:',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Disable', 
            style: 'destructive',
            onPress: async () => {
              await disableAppLock();
              setEnabled(false);
            }
          },
        ],
        { cancelable: true }
      );
    } else {
      setShowPinModal(true);
      setPin('');
      setConfirmPin('');
      setPinError('');
    }
  };

  const handleSetPin = () => {
    if (pin.length < 4) {
      setPinError('PIN must be at least 4 digits');
      return;
    }
    if (pin !== confirmPin) {
      setPinError('PINs do not match');
      return;
    }
    enableAppLock(pin);
    setEnabled(true);
    setShowPinModal(false);
    Alert.alert('Success', 'App Lock has been enabled with your PIN');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="lock-closed" size={48} color="#fff" />
        <Text style={styles.headerTitle}>App Lock</Text>
        <Text style={styles.headerSubtitle}>Lock distracting apps during Ramadan</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Enable App Lock</Text>
          <Switch value={enabled} onValueChange={toggleLock} />
        </View>
      </View>
      <Text style={styles.info}>App Lock requires special permissions to monitor and restrict access to other apps.</Text>

      {/* PIN Input Modal */}
      <Modal visible={showPinModal} transparent animationType="fade">
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set App Lock PIN</Text>
            <Text style={styles.modalSubtitle}>Create a 4-digit PIN to protect your focus time</Text>
            
            <TextInput
              style={styles.pinInput}
              placeholder="Enter PIN"
              placeholderTextColor="#999"
              value={pin}
              onChangeText={(text) => { setPin(text.replace(/[^0-9]/g, '')); setPinError(''); }}
              keyboardType="number-pad"
              maxLength={6}
              secureTextEntry
            />
            
            <TextInput
              style={styles.pinInput}
              placeholder="Confirm PIN"
              placeholderTextColor="#999"
              value={confirmPin}
              onChangeText={(text) => { setConfirmPin(text.replace(/[^0-9]/g, '')); setPinError(''); }}
              keyboardType="number-pad"
              maxLength={6}
              secureTextEntry
            />
            
            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPinModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleSetPin}>
                <Text style={styles.confirmButtonText}>Set PIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#E53935', padding: 30, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  card: { backgroundColor: '#fff', margin: 15, borderRadius: 15, padding: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, color: '#333' },
  info: { fontSize: 14, color: '#666', margin: 15, textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 20, padding: 25, width: '100%', maxWidth: 350 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 20 },
  pinInput: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 15, fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 15, letterSpacing: 5 },
  errorText: { color: '#E53935', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelButton: { flex: 1, padding: 15, marginRight: 10, borderRadius: 12, backgroundColor: '#f5f5f5', alignItems: 'center' },
  cancelButtonText: { color: '#666', fontSize: 16, fontWeight: '600' },
  confirmButton: { flex: 1, padding: 15, marginLeft: 10, borderRadius: 12, backgroundColor: '#E53935', alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AppLockScreen;