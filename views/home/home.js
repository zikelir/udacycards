import React from 'react';
import { Button, Text, ScrollView, StyleSheet } from 'react-native';
import DeckComponent from '../../elements/deckComponent/DeckComponent';
import { asyncGetDecks, asyncGetAll, initialArr, asyncDeleteDecks } from '../../utils/api';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: ''
    };
  }

  componentDidMount() {
    asyncGetDecks().then((result) => {
      console.log(result, 'res');
      if(result === null) {
        console.log('not');
        initialArr();
      }
    });

    asyncGetAll().then((result) => {
      console.log(result);
    });
   }

  static navigationOptions = {
    title: 'Decks',
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* <DeckComponent deckList={this.state.deckList}/> */}
        <Button title="Delete all" onPress={() => asyncDeleteDecks()}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white'
  }
});

export default HomeScreen;