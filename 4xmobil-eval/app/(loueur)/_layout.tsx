import { Tabs } from 'expo-router';
import React from 'react';
import { router } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoueurLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="loueur"
        options={{
          title: 'Loueur',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
        <Tabs.Screen
            name="logout"
            options={{
                title: 'Déconnexion',
                tabBarIcon: ({color}) => <Ionicons name="exit-outline" size={28} color={color} />,
            }}
        />
    </Tabs>
  );
}
