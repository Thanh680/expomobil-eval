import { Platform, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  return (
    <Redirect href="/(tabs)/offreur" />
  );
}