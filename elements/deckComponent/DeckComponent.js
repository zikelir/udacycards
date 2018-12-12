import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class DeckComponent extends React.Component {
  render() {
    const deckTitle = 'foo';
    return (
      <View style={styles.deckCard}>
        <Text>{deckTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
    padding: 4,
    height: 100,
    minHeight: 100
  }
});

export default DeckComponent;