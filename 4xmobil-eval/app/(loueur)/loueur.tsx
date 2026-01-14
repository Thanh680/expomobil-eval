import { Image } from 'expo-image';
import * as Location from 'expo-location';
import {FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { ThemedView } from '@/components/themed-view';
import {Link} from "expo-router";
import { useState, useEffect } from 'react';

export default function LoueurScreen() {


  return (
      <ThemedView style={{flex:1}}>
          <SafeAreaView style={{flex:1}}>
              <Text>Vous êtes un loueur</Text>
          </SafeAreaView>
      </ThemedView>
  );
}
