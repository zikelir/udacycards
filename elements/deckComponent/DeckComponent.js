import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Animated  } from 'react-native';
import { setSelectedDeckId } from '../../actions/decksAction';

class DeckComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {};
  }

  goToDeck = () => {
    this.props.getSelectedDeck(this.props.deck.deckId);
    this.props.navigate("Deck");
  };

  // componentWillReceiveProps(nextProps) {
  //   if(this.props.questionLength !== nextProps.questionLength) {
  //     return true;
  //   }
  // }

  render() {
    return (
      <View style={styles.deckCard} key={'cmp'+this.props.deckId}>
        <Text>Deck name: {this.props.deck.deckName}</Text>
        <Text>Number of questions: {this.props.deck.questions.length}</Text>
        <Button title="see" color="#005466" onPress={() => { this.goToDeck() }}/>
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
    getSelectedDeck: (deckId) => {
      dispatch(setSelectedDeckId(deckId))
    },
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck,
    questionLength: state.decksReducer.questionLength,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckComponent);
