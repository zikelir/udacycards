import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class DeckComponent extends React.Component {
  render() {
    const deckTitle = 'foo';
    return (
      <View style={styles.deckCard}>
        
        <Button title="see" onPress={() => {}}/>
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
    padding: 8,
  }
});

export default DeckComponent;