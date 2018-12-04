import { StyleSheet, Text, View } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import HomeScreen from './views/home/home.js'
import DeckScreen from './views/deck/deck.js'

const HomeStack = createStackNavigator({
  Home:  HomeScreen,
  Settings: 'dssda'
});

const DeckStack = createStackNavigator({
  Deck:  DeckScreen,
  Settings: 'dssda'
});

const App = createAppContainer(
  createBottomTabNavigator({
    Home: HomeStack,
    Deck: DeckStack
  }));

export default App;
