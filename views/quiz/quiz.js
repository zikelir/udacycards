import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, View, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setSelectedDeckId } from '../../actions/decksAction';
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
      backgroundColor: '#005466',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  restartQuiz = () => {
    this.setState({activeQuestion: 0, answered: 0, activeQuestion: 0, correct: 0});
  }

  backToDeck = () => {
    this.props.getSelectedDeck(this.props.selectedDeck.deckId);
    this.props.navigation.navigate('Deck');
  }

  increment = () => {
    this.setState({answered: this.state.answered + 1, activeQuestion: this.state.activeQuestion + 1, correct: this.state.correct + 1});
    ToastAndroid.showWithGravity(
      'Congratulations! 👏👏👏👏👏👏',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  wrong = () => {
    this.setState({answered: this.state.answered + 1, activeQuestion: this.state.activeQuestion + 1,})
    ToastAndroid.showWithGravity(
      'Don\'t give up! 💪💪💪💪💪💪',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <LinearGradient
          colors={['#005466', '#0E0066']}
          style={{width: '100%', height: 650 }}>
            {this.state.activeQuestion + 1 <= this.props.selectedDeck.questions.length && <Text style={{margin: 8, textAlign: 'center', fontWeight: 'bold', fontSize: 36, color: 'white'}}>{this.state.activeQuestion + 1} of {this.props.selectedDeck.questions.length}</Text>}
            {this.state.answered !== this.props.selectedDeck.questions.length && <QuizComponent question={this.props.selectedDeck.questions[this.state.activeQuestion]} increment={this.increment} wrong={this.wrong} activeQuestion={this.state.activeQuestion}/>}
            {this.state.answered === this.props.selectedDeck.questions.length && <View style={{alignItems: 'center', marginTop: 32}}><MaterialCommunityIcons name="checkbox-marked-circle-outline" size={60} color='white' /><Text style={{margin: 8, textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 36, alignItems: 'center'}}>{this.state.correct} correct answer from {this.props.selectedDeck.questions.length} questions</Text></View>}
            {this.state.answered === this.props.selectedDeck.questions.length && <View style={{ margin: 8, flexDirection: 'row' }}>
              <View style={{width: '49%'}}><Button color="#005466" title='Restart Quiz' onPress={() => { this.restartQuiz() }}/></View>
              <View style={{width: '49%', marginLeft: 8}}><Button color="#0D8797" title='Back to Deck' onPress={() => { this.backToDeck() }}/></View>
          </View>}
        </LinearGradient>
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