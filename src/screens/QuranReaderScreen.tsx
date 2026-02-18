// Quran Reader Screen

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getChapterById, getChapterVerses, getVerseAudioUrl, RECITERS } from '../services/QuranService';
import { QuranVerse, QuranChapter } from '../types';

const QuranReaderScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { chapterId } = route.params;

  const [chapter, setChapter] = useState<QuranChapter | null>(null);
  const [verses, setVerses] = useState<QuranVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0]);

  useEffect(() => {
    loadChapterData();
  }, [chapterId]);

  const loadChapterData = async () => {
    setLoading(true);
    const chapterData = getChapterById(chapterId);
    if (chapterData) {
      setChapter(chapterData);
      const versesData = await getChapterVerses(chapterId);
      setVerses(versesData);
    }
    setLoading(false);
  };

  const renderVerse = ({ item, index }: { item: QuranVerse; index: number }) => (
    <TouchableOpacity style={[styles.verseContainer, currentVerseIndex === index && isPlaying && styles.playingVerse]} onPress={() => setCurrentVerseIndex(index)}>
      <View style={styles.verseHeader}>
        <View style={styles.verseNumberBadge}><Text style={styles.verseNumberText}>{item.verseNumber}</Text></View>
      </View>
      <Text style={styles.arabicText}>{item.textArabic}</Text>
      <Text style={styles.translationText}>{item.textTranslation}</Text>
    </TouchableOpacity>
  );

  if (loading) return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="#1E88E5" /><Text style={styles.loadingText}>Loading Surah...</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.chapterNameArabic}>{chapter?.name}</Text>
          <Text style={styles.chapterNameEnglish}>{chapter?.englishName}</Text>
        </View>
      </View>
      <FlatList data={verses} renderItem={renderVerse} keyExtractor={(item) => item.id.toString()} contentContainerStyle={styles.versesList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 15, fontSize: 16, color: '#666' },
  header: { backgroundColor: '#1E88E5', padding: 15, paddingTop: 50, flexDirection: 'row', alignItems: 'center' },
  headerInfo: { marginLeft: 15, flex: 1 },
  chapterNameArabic: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  chapterNameEnglish: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  versesList: { padding: 15 },
  verseContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 10 },
  playingVerse: { borderWidth: 2, borderColor: '#1E88E5', backgroundColor: '#E3F2FD' },
  verseHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  verseNumberBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  verseNumberText: { fontSize: 12, fontWeight: 'bold', color: '#1E88E5' },
  arabicText: { fontSize: 20, color: '#333', textAlign: 'right' },
  translationText: { color: '#666', fontSize: 16, marginTop: 10, fontStyle: 'italic' },
});

export default QuranReaderScreen;