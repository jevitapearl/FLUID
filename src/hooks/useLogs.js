// src/hooks/useLogs.js
import { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, query, where, onSnapshot, Timestamp, orderBy } from 'firebase/firestore';
import { subDays } from 'date-fns';

export const useLogs = (userId, daysAgo) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    // Calculate the date from 'daysAgo'
    const startDate = Timestamp.fromDate(subDays(new Date(), daysAgo));

    // Create the query
    const logsRef = collection(db, 'users', userId, 'logs');
    const q = query(
      logsRef,
      where('date', '>=', startDate),
      orderBy('date', 'desc')
    );

    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedLogs = [];
      querySnapshot.forEach((doc) => {
        fetchedLogs.push({ id: doc.id, ...doc.data() });
      });
      setLogs(fetchedLogs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching logs: ", error);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userId, daysAgo]);

  return { logs, loading };
};