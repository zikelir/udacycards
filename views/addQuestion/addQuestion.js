import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { asyncSaveDeck, asyncGetDecks } from '../../utils/api';
import { addQuestion, getDecks } from '../../actions/decksAction';
class AddQuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: ''
    };
  }

  static navigationOptions = {
    title: 'Add New Deck',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  saveQuestion = (questionObj) => {
    if(questionObj.question.length > 0 && questionObj.answer.length > 0) {
        this.setState({answer: ''});
        this.setState({question: ''});
        this.props.save(questionObj);
        asyncSaveDeck(this.props.deckList);
        this.props.getAllDecks();
        this.props.navigation.navigate('Deck');
    } else {
      alert('You must not submit an deck with empty title');
    }
  }

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.titleStyle}>Add Question</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 8}}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <Text style={styles.titleStyle}>Add Answer to question</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 8}}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <View style={styles.buttonStyle}>
          <Button title="Add Question" onPress={() => {this.saveQuestion({question: this.state.question, answer: this.state.answer, selectedDeckId: this.props.selectedDeck.deckId})}}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white'
  },
  titleStyle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
    paddingTop: 8,
    paddingLeft: 8
  },
  buttonStyle: {
    padding: 8
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    save: (question) => {
      dispatch(addQuestion(question));
    },
    getAllDecks: () => {
      dispatch(getDecks());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionScreen);