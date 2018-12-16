import React from 'react';
import { Button, Text, ScrollView, StyleSheet } from 'react-native';
class DeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Deck',
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
      <ScrollView>
        <Text>eaoihjeuiaheau</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white'
  }
});

export default DeckScreen;