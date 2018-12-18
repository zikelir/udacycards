import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { setSelectedDeck } from '../../actions/decksAction';

class QuizComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {};
  }

  render() {
    return (
      <View style={styles.quizCard}>
        <Text>Deck name: {this.props.deck.deckName}</Text>
        <Text>Number of questions: {this.props.deck.questions.length}</Text>
        <Button title="see" onPress={() => { this.goToDeck() }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quizCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
    padding: 8,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);
