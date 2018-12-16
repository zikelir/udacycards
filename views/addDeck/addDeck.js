import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { asyncSaveDeck, asyncGetDecks } from '../../utils/api';
import { addDeck } from '../../actions/decksAction';
class AddDeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
      deckList: this.props.dekList || []
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
          deckId: this.makeid(),
          deckName: deckName,
          questions: []
        };

        this.setState({deckName: ''});
        this.props.save(deck, this.props);
        asyncSaveDeck(this.props.deckList);
    } else {
      alert('You must not submit an deck with empty title');
    }
  }

  makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
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

const mapDispatchToProps = (dispatch) => {
  return {
    save: (deck) => {
      dispatch(addDeck(deck));
    }
  }
}

const mapStateToProps = (state) => {
  return {
    deckList: state.decksReducer.deckList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckScreen);