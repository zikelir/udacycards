import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo';
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
    title: 'Add New Question',
    headerStyle: {
      backgroundColor: '#005466',
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
        asyncGetDecks();
        ToastAndroid.showWithGravity(
          'Question submited! 👏',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.props.navigation.navigate('Deck');
    } else {
      ToastAndroid.showWithGravity(
        'You must submit a question with answer and question!   😢😢😢😢',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      // alert('You must not submit an deck with empty title');
    }
  }

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <LinearGradient
          colors={['#005466', '#0E0066']}
          style={{width: '100%', height: 650 }}>
          <Text style={styles.titleStyle}>Add Question</Text>
          <TextInput
            style={{height: 40, backgroundColor: 'white', margin: 8}}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
          />
          <Text style={styles.titleStyle}>Add Answer to question</Text>
          <TextInput
            style={{height: 40, backgroundColor: 'white', margin: 8}}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
          />
          <View style={styles.buttonStyle}>
            <Button title="Add Question" color="#005466" onPress={() => {this.saveQuestion({question: this.state.question, answer: this.state.answer, selectedDeckId: this.props.selectedDeck.deckId})}}/>
          </View>
        </LinearGradient>
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
    color: 'white',
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