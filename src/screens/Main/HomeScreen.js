// src/screens/Main/HomeScreen.js
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { useAuth } from '../../context/AuthContext';
import { useLogs } from '../../hooks/useLogs';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

// Helper function to get mood color
const getMoodColor = (mood) => {
  if (mood >= 4) return '#27ae60'; // Green
  if (mood === 3) return '#3498db'; // Blue
  if (mood <= 2) return '#e74c3c'; // Red
  return '#bdc3c7'; // Gray
};

export default function HomeScreen() {
  const { user } = useAuth();
  const { logs, loading } = useLogs(user.uid, 30); // Get last 30 days of logs

  // Memoize processed data to avoid re-calculation on every render
  const { chartData, calendarMarkings } = useMemo(() => {
    // Default empty state for charts
    let chartData = {
      labels: [],
      datasets: [
        { data: [], color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})` }, // Mood
        { data: [], color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})` }, // Productivity
      ],
      legend: ["Mood", "Productivity"]
    };
    
    let calendarMarkings = {};

    if (logs.length > 0) {
      // Sort logs by date just in case
      const sortedLogs = [...logs].sort((a, b) => a.date.toDate() - b.date.toDate());

      // Process for charts
      chartData.labels = sortedLogs.map(log => format(log.date.toDate(), 'd'));
      chartData.datasets[0].data = sortedLogs.map(log => log.mood);
      chartData.datasets[1].data = sortedLogs.map(log => log.productivity);

      // Process for calendar
      sortedLogs.forEach(log => {
        const dateString = format(log.date.toDate(), 'yyyy-MM-dd');
        calendarMarkings[dateString] = {
          marked: true,
          dotColor: getMoodColor(log.mood),
          activeOpacity: 0.7,
        };
      });
    }

    return { chartData, calendarMarkings };
  }, [logs]);

  if (loading) {
    return <View style={styles.container}><Text>Loading dashboard...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your 30-Day Snapshot</Text>
      
      {logs.length > 0 ? (
        <LineChart
          data={chartData}
          width={screenWidth - 32} // from styles.container padding
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      ) : (
        <Text style={styles.placeholder}>Log data to see your graphs.</Text>
      )}

      <Text style={styles.header}>Mood Calendar</Text>
      <Calendar
        style={styles.calendar}
        markedDates={calendarMarkings}
        theme={{
          todayTextColor: '#3498db',
          arrowColor: '#3498db',
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  chart: { marginVertical: 8, borderRadius: 16 },
  calendar: { borderRadius: 16, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.4 },
  placeholder: { textAlign: 'center', marginVertical: 40, color: 'gray' }
});

const chartConfig = {
  backgroundColor: '#e2f0fb',
  backgroundGradientFrom: '#f9f9f9',
  backgroundGradientTo: '#f9f9f9',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '4', strokeWidth: '2', stroke: '#3498db' }
};