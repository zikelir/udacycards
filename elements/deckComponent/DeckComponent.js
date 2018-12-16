import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { setSelectedDeck } from '../../actions/decksAction';
import { createStackNavigator } from 'react-navigation';
import DeckScreen from '../../views/deck/deck.js';


class DeckComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.deck.deckName !== nextProps.deckName) {
      return true
    }
  }

  goToDeck = (deckId) => {
    this.props.setDeck(this.props.deck.deckId);
    this.props.navigate("Deck");
  };

  render() {
    return (
      <View style={styles.deckCard} key={'cmp'+this.props.deck.id}>
        <Text>Deck name: {this.props.deck.deckName}</Text>
        <Text>Number of questions: {this.props.deck.questions.length}</Text>
        <Button title="see" onPress={() => { this.goToDeck(this.props.deck.deckId) }}/>
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

const mapDispatchToProps = (dispatch) => {
  return {
    setDeck: (deckId) => {
      dispatch(setSelectedDeck(deckId));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

// const Deck = createStackNavigator({
//   Deck:  DeckScreen,
// });

export default connect(mapStateToProps, mapDispatchToProps)(DeckComponent);
