import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class DeckComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.deck.deckName !== nextProps.deckName) {
      return true
    }
  }

  render() {
    console.log(this.props.deck);
    return (
      <View style={styles.deckCard} key={this.props.deck.id}>
        <Text>Deck {this.props.deck.deckName}</Text>
        <Text>Number of questions: {this.props.deck.questions.length}</Text>
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