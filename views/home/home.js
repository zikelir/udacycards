import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, View, StyleSheet } from 'react-native';
import DeckComponent from '../../elements/deckComponent/DeckComponent';
import { asyncGetDecks, asyncGetAll, initialArr, asyncDeleteDecks } from '../../utils/api';
import { deleteDecks, getDecks } from '../../actions/decksAction';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: [],
    };
  }

  componentDidMount() {
    asyncGetDecks().then((result) => {
      if(result === null) {
        initialArr();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.questionLength !== nextProps.questionLength) {
      return true;
    }
  }

   deleteAll = () => {
     this.props.delete();
     asyncDeleteDecks();
   }

  static navigationOptions = {
    title: 'Decks',
    headerStyle: {
      backgroundColor: '#005466',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ScrollView styles={styles.contentContainer}>
        { this.props.deckList.length > 0 ? this.props.deckList.map(item => {
          return (<DeckComponent deck={item} key={'dckcmp'+ item.deckId} navigate={this.props.navigation.navigate}/>);
        }) : <Text style={{margin: 8, fontWeight: 'bold'}}>Sorry but no cards</Text> }
        { this.props.deckList.length > 0 && <View style={{margin: 8}}><Button title="Delete all"  color="#B0231A" onPress={() => this.deleteAll()}/></View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    color: 'white'
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    delete: () => {
      dispatch(deleteDecks());
    },
    getAllDecks: () => {
      dispatch(getDecks());
    }
  }
}

const mapStateToProps = (state) => {
  return {
    deckList: state.decksReducer.deckList,
    selectedDeckId: state.decksReducer.selectedDeckId,
    selectedDeck: state.decksReducer.selectedDeck,
    questionLength: state.decksReducer.questionLength
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);