import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class DeckComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    };
  }

  render() {
    return (
      <View style={styles.deckCard}>
        <Text>Deck {this.props.deckList.name}</Text>
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