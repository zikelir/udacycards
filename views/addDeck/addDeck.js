import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, StyleSheet, TextInput, View,ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo';
import { asyncSaveDeck } from '../../utils/api';
import { addDeck, setSelectedDeckId, getDecks } from '../../actions/decksAction';
class AddDeckScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
      deckList: this.props.deckList || [],
    };
  }

  static navigationOptions = {
    title: 'Add New Deck',
    headerStyle: {
      backgroundColor: '#005466',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

   saveDeck = (deckName) => {
    if(deckName.length > 0) {
      const deckId = this.makeid();
      let deck = {
          deckId: deckId,
          deckName: deckName,
          questions: [],
        };

        this.setState({deckName: ''});
        this.props.save(deck);
        asyncSaveDeck(this.props.deckList);
        this.props.getSelectedDeck(deckId);
        this.props.getAllDecks();
        ToastAndroid.showWithGravity(
          'Deck submited! 👏',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.props.navigation.navigate('Deck');
    } else {
      ToastAndroid.showWithGravity(
        'You must not submit an deck with empty title!  😢😢😢😢',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
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
        <LinearGradient
            colors={['#005466', '#0E0066']}
            style={{width: '100%', height: 650 }}>
          <Text style={styles.titleStyle}>Deck Name</Text>
          <TextInput
            style={{height: 40, backgroundColor: 'white', margin: 8}}
            onChangeText={(deckName) => this.setState({deckName})}
            value={this.state.deckName}
          />
          <View style={styles.buttonStyle}>
            <Button title="Create Deck" color="#005466" onPress={() => {this.saveDeck(this.state.deckName)}}/>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    save: (deck) => {
      dispatch(addDeck(deck));
    },
    getSelectedDeck: (deckId) => {
      dispatch(setSelectedDeckId(deckId))
    },
    getAllDecks: () => {
      dispatch(getDecks());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    deckList: state.decksReducer.deckList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckScreen);