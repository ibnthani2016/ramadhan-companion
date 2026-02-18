// Meme Generator Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllTemplates, getRandomSuggestions } from '../services/MemeGeneratorService';

const MemeGeneratorScreen: React.FC = () => {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  const applySuggestion = () => {
    const suggestion = getRandomSuggestions();
    setTopText(suggestion.top);
    setBottomText(suggestion.bottom);
  };

  const generateMeme = () => {
    if (!topText && !bottomText) {
      Alert.alert('Missing Text', 'Please add some text for your meme.');
      return;
    }
    Alert.alert('Success', 'Meme generated! (Demo mode)');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="images" size={48} color="#fff" />
        <Text style={styles.headerTitle}>Meme Generator</Text>
        <Text style={styles.headerSubtitle}>Create fun Ramadan memes</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Top Text</Text>
        <TextInput style={styles.input} value={topText} onChangeText={setTopText} placeholder="Enter top text..." placeholderTextColor="#999" />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Bottom Text</Text>
        <TextInput style={styles.input} value={bottomText} onChangeText={setBottomText} placeholder="Enter bottom text..." placeholderTextColor="#999" />
      </View>
      <TouchableOpacity style={styles.suggestionButton} onPress={applySuggestion}>
        <Ionicons name="bulb" size={20} color="#FFD700" /><Text style={styles.suggestionText}>Get Random Suggestion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.generateButton} onPress={generateMeme}>
        <Ionicons name="sparkles" size={24} color="#fff" /><Text style={styles.generateText}>Generate Meme</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#9C27B0', padding: 30, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  section: { margin: 15 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, fontSize: 16, color: '#333' },
  suggestionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 15, padding: 15 },
  suggestionText: { marginLeft: 8, fontSize: 16, color: '#333' },
  generateButton: { backgroundColor: '#9C27B0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 15, padding: 18, borderRadius: 15 },
  generateText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});

export default MemeGeneratorScreen;