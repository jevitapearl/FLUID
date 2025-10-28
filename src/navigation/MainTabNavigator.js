// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens
import HomeScreen from '../screens/Main/HomeScreen';
import MindHubScreen from '../screens/Main/MindHubScreen';
import ChatAssistantScreen from '../screens/Main/ChatAssistantScreen';
import LogsScreen from '../screens/Main/LogsScreen';
import MoreScreen from '../screens/Main/MoreScreen';

const Tab = createBottomTabNavigator();

// A calm blue color for the tabs
const CALM_BLUE = '#3498db';

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mind Hub') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Logs') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: CALM_BLUE,
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#f9f9f9', elevation: 0, shadowOpacity: 0 },
        headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mind Hub" component={MindHubScreen} />
      <Tab.Screen name="Chat" component={ChatAssistantScreen} options={{ title: "Chat Assistant" }}/>
      <Tab.Screen name="Logs" component={LogsScreen} options={{ title: "New Log" }}/>
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}