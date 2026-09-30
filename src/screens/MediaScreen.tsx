// Media Screen

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MEDIA_CATEGORIES, POPULAR_RECITERS } from '../services/MediaService';
import { colors, spacing, typography, shadows, borderRadius } from '../theme';

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
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.primary, padding: spacing.lg, paddingTop: 50 },
  headerTitle: { ...typography.h1, color: colors.textOnPrimary },
  headerSubtitle: { ...typography.caption, color: 'rgba(255,255,255,0.8)', marginTop: spacing.xs },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: spacing.md, marginTop: spacing.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderRadius: borderRadius.lg },
  searchPlaceholder: { marginLeft: spacing.sm, fontSize: 16, color: colors.textTertiary },
  section: { marginTop: spacing.xl, paddingHorizontal: spacing.md },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryItem: { width: '48%', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm, alignItems: 'center', ...shadows.sm },
  categoryName: { marginTop: spacing.sm, fontSize: 14, color: colors.text, fontWeight: '500' },
  reciterItem: { alignItems: 'center', width: 80, marginRight: spacing.md },
  reciterAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.xs },
  reciterName: { fontSize: 12, color: colors.text, textAlign: 'center', fontWeight: '500' },
  reciterFollowers: { fontSize: 10, color: colors.textSecondary, marginTop: 2 },
});

export default MediaScreen;