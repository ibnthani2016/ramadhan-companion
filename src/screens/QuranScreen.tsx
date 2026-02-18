// Quran Screen - List of chapters (Surahs)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { getAllChapters, JUZ_INFO } from '../services/QuranService';
import { QuranChapter } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

const QuranScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [chapters, setChapters] = useState<QuranChapter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'juz'>('surah');

  useEffect(() => {
    setChapters(getAllChapters());
  }, []);

  const filteredChapters = chapters.filter(chapter =>
    chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chapter.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToReader = (chapterId: number) => {
    navigation.navigate('QuranReader', { chapterId });
  };

  const renderSurahItem = ({ item }: { item: QuranChapter }) => (
    <TouchableOpacity style={styles.surahItem} onPress={() => navigateToReader(item.id)}>
      <View style={styles.surahNumber}>
        <Text style={styles.surahNumberText}>{item.id}</Text>
      </View>
      <View style={styles.surahInfo}>
        <Text style={styles.surahNameArabic}>{item.name}</Text>
        <Text style={styles.surahNameEnglish}>{item.englishName}</Text>
        <Text style={styles.surahMeta}>{item.numberOfAyahs} verses · {item.revelationType}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const renderJuzItem = ({ item }: { item: { id: number; name: string; startChapter: number } }) => (
    <TouchableOpacity style={styles.juzItem} onPress={() => navigateToReader(item.startChapter)}>
      <View style={styles.juzNumber}>
        <Text style={styles.juzNumberText}>{item.id}</Text>
      </View>
      <View style={styles.juzInfo}>
        <Text style={styles.juzName}>{item.name}</Text>
        <Text style={styles.juzStart}>Starts at Surah {item.startChapter}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Noble Quran</Text>
        <Text style={styles.headerSubtitle}>114 Surahs · 30 Juz</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Surahs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'surah' && styles.activeTab]} onPress={() => setActiveTab('surah')}>
          <Text style={[styles.tabText, activeTab === 'surah' && styles.activeTabText]}>Surahs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'juz' && styles.activeTab]} onPress={() => setActiveTab('juz')}>
          <Text style={[styles.tabText, activeTab === 'juz' && styles.activeTabText]}>Juz</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'surah' ? (
        <FlatList data={filteredChapters} renderItem={renderSurahItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} />
      ) : (
        <FlatList data={JUZ_INFO} renderItem={renderJuzItem} keyExtractor={item => item.id.toString()} contentContainerStyle={styles.listContent} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#1E88E5', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, paddingHorizontal: 15, paddingVertical: 12, borderRadius: 10 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  tabsContainer: { flexDirection: 'row', marginHorizontal: 15, marginTop: 15, backgroundColor: '#fff', borderRadius: 10, padding: 5 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#1E88E5' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  listContent: { padding: 15 },
  surahItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10 },
  surahNumber: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  surahNumberText: { fontSize: 16, fontWeight: 'bold', color: '#1E88E5' },
  surahInfo: { flex: 1, marginLeft: 12 },
  surahNameArabic: { fontSize: 20, color: '#1E88E5', fontWeight: 'bold' },
  surahNameEnglish: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 2 },
  surahMeta: { fontSize: 12, color: '#666', marginTop: 2 },
  juzItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10 },
  juzNumber: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  juzNumberText: { fontSize: 18, fontWeight: 'bold', color: '#1E88E5' },
  juzInfo: { flex: 1, marginLeft: 12 },
  juzName: { fontSize: 18, fontWeight: '600', color: '#333' },
  juzStart: { fontSize: 14, color: '#666', marginTop: 2 },
});

export default QuranScreen;