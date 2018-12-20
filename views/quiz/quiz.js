import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { asyncSaveDeck, asyncGetDecks } from '../../utils/api';
import { addQuestion, getDecks } from '../../actions/decksAction';
import QuizComponent from '../../elements/QuizComponent/QuizComponent';
class QuizScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
      answer: '',
      answered: 10,
      activeQuestion: 1
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

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        {this.state.answered === this.props.selectedDeck.questions.length && <Text style={{margin: 8}}>8 points from 10</Text>}
        <QuizComponent question={this.props.selectedDeck.questions[this.state.question]}/>
        <View style={{margin: 8}}><Button title="Next Question"/></View>
        {this.state.answered === this.props.selectedDeck.questions.length && <Button style={{margin: 8}} title='Restart Quiz'/>}
        {this.state.answered === this.props.selectedDeck.questions.length && <Button style={{margin: 8}} title='Back to Deck'/>}
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
    
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);