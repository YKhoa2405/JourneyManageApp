import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import NaviBottom from './screens/navigation/NaviBottom';
import { createStackNavigator } from '@react-navigation/stack';
import JourneyDetail from './screens/Journey/JourneyDetail';





export default function App() {
  const Stack = createStackNavigator()
  return (
    <NaviBottom></NaviBottom>
  );
}

