import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { setSelectedDeck } from '../../actions/decksAction';

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

  goToDeck = () => {
    this.props.setDeck(this.props.deck);
    this.props.navigate("Deck");
  };

  render() {
    return (
      <View style={styles.deckCard} key={'cmp'+this.props.deckId}>
        <Text>Deck name: {this.props.deck.deckName}</Text>
        <Text>Number of questions: {this.props.deck.questions.length}</Text>
        <Button title="see" onPress={() => { this.goToDeck() }}/>
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
    setDeck: (deck) => {
      dispatch(setSelectedDeck(deck));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckComponent);
