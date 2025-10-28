// src/screens/Main/LogsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../../config/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'; // <-- FIX: Added this import

export default function LogsScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mood, setMood] = useState(3); // Default to neutral (3)
  const [productivity, setProductivity] = useState(3);
  const [notes, setNotes] = useState('');
  const [medicationTaken, setMedicationTaken] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Star/Rating component
  const RatingInput = ({ label, value, onRate }) => (
    <View style={styles.ratingContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => onRate(star)}>
            <Ionicons
              name={star <= value ? 'star' : 'star-outline'}
              size={30}
              color={star <= value ? '#f1c40f' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const handleSubmitLog = async () => {
    if (!mood || !productivity) {
      Alert.alert('Missing Data', 'Please provide a rating for mood and productivity.');
      return;
    }

    const userId = auth.currentUser?.uid; // Use optional chaining
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to save a log.');
      return;
    }

    try {
      // Path: /users/{userId}/logs/{logId}
      const logsCollectionRef = collection(db, 'users', userId, 'logs');
      await addDoc(logsCollectionRef, {
        date: Timestamp.fromDate(date),
        mood: mood,
        productivity: productivity,
        notes: notes,
        medicationTaken: medicationTaken
      });

      Alert.alert('Log Saved!', 'Your entry has been recorded.');
      // Reset form
      setMood(3);
      setProductivity(3);
      setNotes('');
      setMedicationTaken(false);
      // Go back to the Home screen to see the new data
      navigation.navigate('Home');

    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Could not save your log. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Date Picker */}
      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Better display for iOS
          onChange={onDateChange}
          maximumDate={new Date()} // Can't log for the future
        />
      )}

      {/* Mood Logger */}
      <RatingInput label="How was your mood?" value={mood} onRate={setMood} />

      {/* Productivity Logger */}
      <RatingInput label="How was your productivity?" value={productivity} onRate={setProductivity} />

      {/* Summary/Notes */}
      <Text style={styles.label}>Summary / Notes</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="Any thoughts from today?"
        multiline
      />

      {/* Medication Tracker */}
      <View style={styles.medicationContainer}>
        <Text style={styles.label}>Medication Tracker</Text>
        <TouchableOpacity
          style={[styles.toggleButton, medicationTaken ? styles.toggleActive : styles.toggleInactive]}
          onPress={() => setMedicationTaken(!medicationTaken)}
        >
          <Text style={styles.toggleText}>{medicationTaken ? 'Taken' : 'Not Taken'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Save Log" onPress={handleSubmitLog} />
    </ScrollView>
  );
}

// Add styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 10, marginTop: 20 },
  datePickerButton: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, alignItems: 'center' },
  datePickerText: { fontSize: 16 },
  ratingContainer: { marginTop: 15 },
  starsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 },
  notesInput: { height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, textAlignVertical: 'top' },
  medicationContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  toggleButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  toggleActive: { backgroundColor: '#27ae60' },
  toggleInactive: { backgroundColor: '#bdc3c7' },
  toggleText: { color: '#fff', fontWeight: 'bold' }
});