import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import { setSelectedDeck } from '../../actions/decksAction';
import { clearLocalNotification, setLocalNotification } from '../../utils/push';
import {
  NavigationEvents
} from 'react-navigation';
class DeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDeck: '',
      opacity: new Animated.Value(0),
      width: new Animated.Value(0),
    };
  }
  static navigationOptions = {
    title: 'Deck',
    headerStyle: {
      backgroundColor: '#005466',
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
    const { opacity, width } = this.state;
    if(this.props.selectedDeckId) {
      this.props.deckList.forEach(item => {
        if(item.deckId === this.props.selectedDeckId) {
          this.props.getSelectedDeck(this.props.selectedDeck);
        }
      })
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000
      }).start();

      Animated.spring(width, {
        toValue: '100%',
        speed: 5
      }).start();

    }
  }

  render() {
    const { opacity, width } = this.state;
    return (
      <Animated.View style={{ opacity, width }}>
        <LinearGradient
          colors={['#005466', '#0E0066']}
          style={{width: '100%', height: 650 }}>
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
          {this.props.selectedDeck ? <Text style={{margin: 8, color: 'white', fontSize: 24}}><Text style={{fontWeight: 'bold'}}>Deck Name:</Text> {this.props.selectedDeck.deckName}</Text> : <Text style={{margin: 8, color: 'white', fontSize: 24}}>No name</Text>}
          {(this.props.selectedDeck &&  this.props.selectedDeck.questions.length > 0) ? <Text  style={{margin: 8, color: 'white', fontSize: 24}}><Text style={{fontWeight: 'bold'}}>Number of questions:</Text> {this.props.selectedDeck.questions.length}</Text> : <Text style={{margin: 8, color: 'white', fontSize: 24, fontWeight: 'bold'}}>Number of questions: 0</Text>}
          {(this.props.selectedDeck && this.props.selectedDeck.questions.length > 0) ? <View style={{margin: 8}}><Button title="Start Quiz" onPress={() => { this.goToQuiz() }} color='#0D8797'/></View> : <View style={{margin: 8}}><Button title="Start Quiz" onPress={() => { this.goToQuiz() }} color='orange' disabled={true}/></View>}
          <View style={{margin: 8}}><Button title="Add Question" color="#005466" onPress={() => { this.goToAddQuestion() }}/></View>
        </LinearGradient>
      </Animated.View>
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
    deckList: state.decksReducer.deckList,
    questionLength: state.decksReducer.questionLength
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);