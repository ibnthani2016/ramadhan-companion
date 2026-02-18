// Main Navigation - Bottom Tab Navigator with all main screens

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens - we'll create these next
import HomeScreen from '../screens/HomeScreen';
import PrayerTimesScreen from '../screens/PrayerTimesScreen';
import QuranScreen from '../screens/QuranScreen';
import QuranReaderScreen from '../screens/QuranReaderScreen';
import MediaScreen from '../screens/MediaScreen';
import MediaSearchScreen from '../screens/MediaSearchScreen';
import MediaPlayerScreen from '../screens/MediaPlayerScreen';
import AppLockScreen from '../screens/AppLockScreen';
import MemeGeneratorScreen from '../screens/MemeGeneratorScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Types
export type RootStackParamList = {
  Main: undefined;
  QuranReader: { chapterId: number };
  MediaSearch: undefined;
  MediaPlayer: { mediaId: string };
  Settings: undefined;
  MemeGenerator: undefined;
  AppLock: undefined;
  MoreMenu: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Prayer: undefined;
  Quran: undefined;
  Media: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Tab Navigator
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Prayer':
              iconName = focused ? 'moon' : 'moon-outline';
              break;
            case 'Quran':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Media':
              iconName = focused ? 'play-circle' : 'play-circle-outline';
              break;
            case 'More':
              iconName = focused ? 'apps' : 'apps-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E88E5',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Ramadan' }}
      />
      <Tab.Screen 
        name="Prayer" 
        component={PrayerTimesScreen} 
        options={{ title: 'Prayer Times' }}
      />
      <Tab.Screen 
        name="Quran" 
        component={QuranScreen} 
        options={{ title: 'Quran' }}
      />
      <Tab.Screen 
        name="Media" 
        component={MediaScreen} 
        options={{ title: 'Media' }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreMenuScreen} 
        options={{ title: 'More' }}
      />
    </Tab.Navigator>
  );
};

// More Menu Screen
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MoreMenuScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const menuItems = [
    { icon: 'lock-closed', title: 'App Lock', screen: 'AppLock', color: '#E53935' },
    { icon: 'images', title: 'Meme Generator', screen: 'MemeGenerator', color: '#8E24AA' },
    { icon: 'settings', title: 'Settings', screen: 'Settings', color: '#1E88E5' },
  ];

  return (
    <View style={menuStyles.container}>
      <View style={menuStyles.header}>
        <Text style={menuStyles.headerTitle}>More Features</Text>
      </View>
      
      <View style={menuStyles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={menuStyles.menuItem}
            onPress={() => navigation?.navigate(item.screen)}
          >
            <View style={[menuStyles.iconContainer, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={32} color="#fff" />
            </View>
            <Text style={menuStyles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#1E88E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

// Main Stack Navigator
const AppNavigator: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen 
            name="QuranReader" 
            component={QuranReaderScreen} 
          />
          <Stack.Screen 
            name="MediaSearch" 
            component={MediaSearchScreen} 
          />
          <Stack.Screen 
            name="MediaPlayer" 
            component={MediaPlayerScreen} 
          />
          <Stack.Screen 
            name="AppLock" 
            component={AppLockScreen} 
          />
          <Stack.Screen 
            name="MemeGenerator" 
            component={MemeGeneratorScreen} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;