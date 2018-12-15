import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { asyncSaveDeck, asyncGetDecks } from '../../utils/api';
class AddDeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: ''
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

   saveDeck = (deckName) => {
    if(deckName.length > 0) {
      let deck = {
          deckId: 12345,
          deckName: deckName,
          questions: [
            {
              question: 'foo?',
              answer: 'bar'
            }
          ]
        };

      // asyncSaveDeck();
      this.setState({deckName: ''});
    } else {
      alert('You must not submit an deck with empty title');
    }
  }

  render() {
    return (
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.titleStyle}>Deck Name</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 8}}
          onChangeText={(deckName) => this.setState({deckName})}
          value={this.state.deckName}
        />
        <View style={styles.buttonStyle}>
          <Button title="Create Deck" onPress={() => {this.saveDeck(this.state.deckName)}}/>
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

export default connect()(AddDeckScreen);