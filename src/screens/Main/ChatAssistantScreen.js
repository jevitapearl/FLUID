// src/screens/Main/ChatAssistantScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';
import Sentiment from 'sentiment';
import { getGeminiResponse } from '../../api/gemini'; // (Req #1)

const sentimentAnalyzer = new Sentiment();

export default function ChatAssistantScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! I am FLUID, your mental health assistant. How are you feeling today?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [sentiment, setSentiment] = useState({ score: 0, label: 'Neutral' }); // (Req #2)
  
  const flatListRef = useRef(null);

  // --- Voice Handlers ---
  useEffect(() => {
    // Setup Voice listeners
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechError = (err) => console.error('Voice error:', err);
    Voice.onSpeechResults = (e) => {
      const text = e.value[0];
      setInputText(text);
      analyzeSentiment(text); // (Req #2)
    };
    return () => {
      // Cleanup: destroy voice instance
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  // --- Sentiment Analysis ---
  const analyzeSentiment = (text) => {
    const result = sentimentAnalyzer.analyze(text);
    let label = 'Neutral';
    if (result.score > 2) label = 'Very Positive';
    else if (result.score > 0) label = 'Positive';
    else if (result.score < -2) label = 'Very Negative';
    else if (result.score < 0) label = 'Negative';
    setSentiment({ score: result.score, label });
  };

  // --- Chat Handlers ---
  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSentiment({ score: 0, label: 'Neutral' }); // Reset sentiment

    // Get bot response
    const botResponseText = await getGeminiResponse(userMessage.text); // (Req #1)
    const botMessage = { id: (Date.now() + 1).toString(), text: botResponseText, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <View style={styles.container}>
      {/* (Req #2) Sentiment Display */}
      <View style={[styles.sentimentBanner, { backgroundColor: getSentimentColor(sentiment.score) }]}>
        <Text style={styles.sentimentText}>Detected Sentiment: {sentiment.label} (Score: {sentiment.score})</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'bot' ? styles.botBubble : styles.userBubble]}>
            <Text style={item.sender === 'bot' ? styles.botText : styles.userText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
            if (text.length > 3) analyzeSentiment(text); // Live sentiment
          }}
          placeholder="Type or tap mic to talk..."
        />
        <TouchableOpacity style={styles.iconButton} onPress={isListening ? stopListening : startListening}>
          <Ionicons name={isListening ? "mic-off" : "mic"} size={24} color="#3498db" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper for sentiment color
const getSentimentColor = (score) => {
  if (score > 0) return '#e0f7e0'; // Light green
  if (score < 0) return '#fbe0e0'; // Light red
  return '#f0f0f0'; // Light gray
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  sentimentBanner: { padding: 10, alignItems: 'center', },
  sentimentText: { fontSize: 14, fontWeight: '500', color: '#333' },
  messageList: { padding: 10 },
  messageBubble: { padding: 12, borderRadius: 18, marginVertical: 5, maxWidth: '80%' },
  userBubble: { backgroundColor: '#3498db', alignSelf: 'flex-end' },
  botBubble: { backgroundColor: '#ecf0f1', alignSelf: 'flex-start' },
  userText: { color: '#fff' },
  botText: { color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, height: 40, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 15, backgroundColor: '#f9f9f9' },
  iconButton: { padding: 10, marginLeft: 5 }
});