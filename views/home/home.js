import React from 'react';
import { Button, Text, ScrollView, StyleSheet } from 'react-native';
import DeckComponent from '../../elements/deckComponent/DeckComponent';
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <DeckComponent />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white'
  }
});

export default HomeScreen;