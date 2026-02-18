// Media Screen

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MEDIA_CATEGORIES, POPULAR_RECITERS } from '../services/MediaService';

const MediaScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Islamic Media</Text>
        <Text style={styles.headerSubtitle}>Quran, Lectures, Nasheeds & More</Text>
      </View>

      <TouchableOpacity style={styles.searchContainer} onPress={() => navigation.navigate('MediaSearch')}>
        <Ionicons name="search" size={20} color="#666" />
        <Text style={styles.searchPlaceholder}>Search videos, audios, reciters...</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryGrid}>
          {MEDIA_CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem}>
              <Ionicons name={cat.icon as any} size={24} color="#1E88E5" />
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Reciters</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {POPULAR_RECITERS.map((reciter, index) => (
            <View key={index} style={styles.reciterItem}>
              <View style={styles.reciterAvatar}><Ionicons name="person" size={24} color="#1E88E5" /></View>
              <Text style={styles.reciterName} numberOfLines={1}>{reciter.name}</Text>
              <Text style={styles.reciterFollowers}>{reciter.followers}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1E88E5', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10 },
  searchPlaceholder: { marginLeft: 10, fontSize: 16, color: '#999' },
  section: { marginTop: 20, paddingHorizontal: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, alignItems: 'center' },
  categoryName: { marginTop: 8, fontSize: 14, color: '#333', fontWeight: '500' },
  reciterItem: { alignItems: 'center', width: 80, marginRight: 15 },
  reciterAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  reciterName: { fontSize: 12, color: '#333', textAlign: 'center', fontWeight: '500' },
  reciterFollowers: { fontSize: 10, color: '#666', marginTop: 2 },
});

export default MediaScreen;