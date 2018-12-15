import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import HomeScreen from '../../views/home/home.js';
// import DeckScreen from '../../views/deck/deck.js';
import AddDeckScreen from '../../views/addDeck/addDeck'

import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeStack = createStackNavigator({
  Home:  HomeScreen,
});

// const DeckStack = createStackNavigator({
//   Deck:  DeckScreen,
// });

const AddDeckStack = createStackNavigator({
  AddDeck:  AddDeckScreen,
});

const NavigatorComponent = createAppContainer(
  createBottomTabNavigator({
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: () => <MaterialCommunityIcons name="home" size={30} color='black' />
      }
    },
    // Deck: {
    //   screen: DeckStack,
    //   navigationOptions: {
    //     tabBarIcon: () => <MaterialCommunityIcons name="cards-playing-outline" size={30} color='black' />
    //   }
    // },
    AddDeck: {
      screen: AddDeckStack,
      navigationOptions: {
        tabBarIcon: () => <MaterialCommunityIcons name="playlist-plus" size={30} color='black' />
      }
    }
  }));

export default NavigatorComponent;
