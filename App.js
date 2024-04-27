import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import NaviBottom from './screens/navigation/NaviBottom';
import { createStackNavigator } from '@react-navigation/stack';
import JourneyDetail from './screens/Journey/JourneyDetail';
import Post from './screens/components/Post';
import ProfileScreen from './screens/Profile/Profile';





export default function App() {
  const Stack = createStackNavigator()
  return (
    <NaviBottom></NaviBottom>
  );
}

