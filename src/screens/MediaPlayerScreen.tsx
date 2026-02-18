// Media Player Screen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MediaPlayerScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.title}>Now Playing</Text>
      </View>
      <View style={styles.content}><Text style={styles.placeholder}>Media Player</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1E88E5', padding: 15, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
  title: { marginLeft: 15, fontSize: 20, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholder: { fontSize: 16, color: '#999' },
});

export default MediaPlayerScreen;
