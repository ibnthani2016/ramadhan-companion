// Meme Generator Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAllTemplates, getRandomSuggestions } from '../services/MemeGeneratorService';
import { colors, spacing, typography, shadows, borderRadius } from '../theme';

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
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.secondary, padding: 30, alignItems: 'center', borderBottomLeftRadius: borderRadius.xl, borderBottomRightRadius: borderRadius.xl, ...shadows.md },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.textOnPrimary, marginTop: spacing.sm },
  headerSubtitle: { ...typography.caption, color: 'rgba(255,255,255,0.8)', marginTop: spacing.xs },
  section: { margin: spacing.md },
  label: { ...typography.body, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  input: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, padding: spacing.md, fontSize: 16, color: colors.text },
  suggestionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: spacing.md, padding: spacing.md },
  suggestionText: { marginLeft: spacing.sm, ...typography.body, color: colors.text },
  generateButton: { backgroundColor: colors.secondary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: spacing.md, padding: spacing.lg, borderRadius: borderRadius.xl },
  generateText: { color: colors.textOnPrimary, fontSize: 18, fontWeight: 'bold', marginLeft: spacing.sm },
});

export default MemeGeneratorScreen;