import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { asyncSaveDeck, asyncGetDecks } from '../../utils/api';
import { addQuestion, getDecks, setSelectedDeckId } from '../../actions/decksAction';
import QuizComponent from '../../elements/QuizComponent/QuizComponent';
class QuizScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      answer: '',
      answered: 0,
      activeQuestion: 0,
      correct: 0,
      finished: false
    };
  }

  static navigationOptions = {
    title: 'Quiz',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  restartQuiz = () => {
    this.setState({activeQuestion: 0});
  }

  backToDeck = () => {
    this.props.getSelectedDeck(this.props.selectedDeck.deckId);
    this.props.navigation.navigate('Deck');
  }

  increment = () => {
    this.setState({answered: this.state.answered + 1, activeQuestion: this.state.activeQuestion + 1, correct: this.state.correct + 1});
    console.log(this.state.answered, this.props.selectedDeck.questions.length);
  }

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        {this.state.activeQuestion + 1 <= this.props.selectedDeck.questions.length && <Text style={{margin: 8, textAlign: 'center', fontWeight: 'bold'}}>{this.state.activeQuestion + 1} of {this.props.selectedDeck.questions.length}</Text>}
        {this.state.answered !== this.props.selectedDeck.questions.length && <QuizComponent question={this.props.selectedDeck.questions[this.state.activeQuestion]} increment={this.increment} activeQuestion={this.state.activeQuestion}/>}
        {this.state.answered === this.props.selectedDeck.questions.length && <Text style={{margin: 8}}>{this.state.correct} correct answer from {this.props.selectedDeck.questions.length} questions</Text>}
        {this.state.answered === this.props.selectedDeck.questions.length && <Button style={{margin: 8}} title='Restart Quiz' onPress={() => { this.restartQuiz() }}/>}
        {this.state.answered === this.props.selectedDeck.questions.length && <Button style={{margin: 8}} title='Back to Deck' onPress={() => { this.backToDeck() }}/>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white'
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
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);