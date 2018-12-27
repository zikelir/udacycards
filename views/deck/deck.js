import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, View, StyleSheet } from 'react-native';
import { setSelectedDeck } from '../../actions/decksAction';
import { asyncGetDecks } from '../../utils/api';
import { clearLocalNotification, setLocalNotification } from '../../utils/push';
import {
  NavigationEvents
} from 'react-navigation';
class DeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDeck: ''
    };
  }
  static navigationOptions = {
    title: 'Deck',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  goToAddQuestion = () => {
    this.props.navigation.navigate("AddQuestion");
  };

  goToQuiz = () => {
    clearLocalNotification()
      .then(setLocalNotification);
    this.props.navigation.navigate("Quiz");
  }

  componentDidMount() {
    if(this.props.selectedDeckId) {
      this.props.deckList.forEach(item => {
        if(item.deckId === this.props.selectedDeckId) {
          this.props.getSelectedDeck(item);
        }
      })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if(this.props.selecteDeck !== nextProps.selecteDeck) {
  //     console.log('willlll');
  //     return true;
  //   }
  // }


  render() {
    return (
      <View style={{borderWidth: 1, borderColor: 'gray', margin: 8}}>
        <NavigationEvents
            onWillFocus={() => {
              if(this.props.selectedDeckId) {
                this.props.deckList.forEach(item => {
                  if(item.deckId === this.props.selectedDeckId) {
                    this.props.getSelectedDeck(item);
                  }
                })
              }
            }}
          />
        {this.props.selectedDeck ? <Text style={{margin: 8}}>Deck Name: {this.props.selectedDeck.deckName}</Text> : <Text style={{margin: 8}}>No name</Text>}
        {(this.props.selecteDeck &&  this.props.selectedDeck.questions > 0) ? <Text style={{margin: 8}}>Number of questions: {this.props.selectedDeck.questions.length}</Text> : <Text style={{margin: 8}}>Number of questions: 0</Text>}
        {(this.props.selecteDeck && this.props.selectedDeck.questions.length > 0) ? <View style={{margin: 8}}><Button title="Start Quiz" onPress={() => { this.goToQuiz() }} color='orange'/></View> : <View style={{margin: 8}}><Button title="Start Quiz" onPress={() => { this.goToQuiz() }} color='orange' disabled={true}/></View>}
        <View style={{margin: 8}}><Button title="Start Quiz" onPress={() => { this.goToQuiz() }} color='orange'/></View>
        <View style={{margin: 8}}><Button title="Add Question" onPress={() => { this.goToAddQuestion() }}/></View>
      </View>
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
    getSelectedDeck: (deck) => {
      dispatch(setSelectedDeck(deck))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeckId: state.decksReducer.selectedDeckId,
    selectedDeck: state.decksReducer.selectedDeck,
    deckList: state.decksReducer.deckList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);