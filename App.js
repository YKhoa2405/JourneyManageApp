import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/Welcome';
import LoginScreen from './screens/Login';
import NaviBottom from './screens/navigation/NaviBottom';
import DogImage from './screens/test';
import SearchCpm from './screens/components/SearchCpm';
import ProfileScreen from './screens/Profile';



export default function App() {

  return (
    <NaviBottom></NaviBottom>
  );
}

