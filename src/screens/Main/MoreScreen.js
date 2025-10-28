// src/screens/Main/MoreScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { EMERGENCY_CONTACTS, PROFESSIONAL_RESOURCES } from '../../constants/data';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MoreScreen() {
  const { logout } = useAuth();

  const handleLinkPress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* (Req #5) Emergency Contacts */}
      <Text style={styles.header}>Emergency Contacts</Text>
      <View style={styles.card}>
        {EMERGENCY_CONTACTS.map(contact => (
          <TouchableOpacity 
            key={contact.id} 
            style={styles.resourceItem} 
            onPress={() => handleLinkPress(contact.url)}
          >
            <View>
              <Text style={styles.resourceTitle}>{contact.name}</Text>
              <Text style={styles.resourceSub}>{contact.phone}</Text>
            </View>
            <Ionicons name="call" size={24} color="#e74c3c" />
          </TouchableOpacity>
        ))}
      </View>

      {/* (Req #6) Find a Professional */}
      <Text style={styles.header}>Find a Professional</Text>
      <View style={styles.card}>
        {PROFESSIONAL_RESOURCES.map(resource => (
          <TouchableOpacity 
            key={resource.id} 
            style={styles.resourceItem} 
            onPress={() => handleLinkPress(resource.url)}
          >
            <Text style={styles.resourceTitle}>{resource.name}</Text>
            <Ionicons name="open-outline" size={24} color="#3498db" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback & Settings (Simplified) */}
      <Text style={styles.header}>Settings</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.resourceItem}>
          <Text style={styles.resourceTitle}>Send Feedback</Text>
          <Ionicons name="mail-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      
      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={logout} color="#e74c3c" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, paddingHorizontal: 16 },
  card: { backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 16, overflow: 'hidden' },
  resourceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  resourceTitle: { fontSize: 16, fontWeight: '500' },
  resourceSub: { fontSize: 14, color: 'gray', marginTop: 3 },
  logoutButtonContainer: { margin: 20, marginTop: 40 }
});