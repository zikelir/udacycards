import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import HomeScreen from './views/home/home.js'
import DeckScreen from './views/deck/deck.js'

import { fontAwesome, Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomeStack = createStackNavigator({
  Home:  HomeScreen,
});

const DeckStack = createStackNavigator({
  Deck:  DeckScreen,
});

const App = createAppContainer(
  createBottomTabNavigator({
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome name="home" size={30} color='black' />
      }
    },
    Deck: {
      screen: DeckStack,
      navigationOptions: {
        tabBarIcon: () => <FontAwesome name="home" size={30} color='black' />
      }
    }
  }));

export default App;
