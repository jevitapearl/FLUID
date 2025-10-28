// src/screens/Main/MindHubScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { COPING_STRATEGIES, ARTICLES } from '../../constants/data';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MindHubScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Section 1: Instant Coping Strategies (Req #4) */}
      <Text style={styles.header}>Instant Coping Strategies</Text>
      <FlatList
        data={COPING_STRATEGIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Section 2: Simple Meditation Helper */}
      <Text style={styles.header}>Quick Meditation</Text>
      <TouchableOpacity style={styles.meditationButton}>
        <Ionicons name="play-circle" size={30} color="#fff" />
        <Text style={styles.meditationText}>Start 1-Min Breathing</Text>
      </TouchableOpacity>
      
      {/* Section 3: Articles */}
      <Text style={styles.header}>Wellness Articles</Text>
      {ARTICLES.map(article => (
        <TouchableOpacity key={article.id} style={styles.articleCard}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleSnippet}>{article.snippet}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// Add styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, paddingHorizontal: 16 },
  // Coping Strategy Item
  listItem: { backgroundColor: '#f0f4f8', padding: 15, borderRadius: 10, marginRight: 10, width: 250 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  itemDescription: { fontSize: 14, color: '#555' },
  // Meditation
  meditationButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3498db', padding: 20, borderRadius: 10, marginHorizontal: 16, justifyContent: 'center' },
  meditationText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  // Article
  articleCard: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, marginHorizontal: 16, marginBottom: 10, elevation: 1 },
  articleTitle: { fontSize: 18, fontWeight: 'bold' },
  articleSnippet: { fontSize: 14, color: 'gray', marginTop: 5 },
});