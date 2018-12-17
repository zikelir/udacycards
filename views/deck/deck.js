import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, View, StyleSheet } from 'react-native';
class DeckScreen extends React.Component {
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

  render() {
    return (
      <View style={{borderWidth: 1, borderColor: 'gray', margin: 8}}>
        <Text style={{margin: 8}}>Deck Name: {this.props.selectedDeck.deckName}</Text>
        <Text style={{margin: 8}}>Number of questions: {this.props.selectedDeck.questions.length}</Text>
        <View style={{margin: 8}}><Button title="Start Quiz" onPress={() => {}} color='orange'/></View>
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
  return {}
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);