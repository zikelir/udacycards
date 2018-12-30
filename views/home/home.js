import React from 'react';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { Button, Text, ScrollView, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeckComponent from '../../elements/deckComponent/DeckComponent';
import { asyncGetDecks, initialArr, asyncDeleteDecks } from '../../utils/api';
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
      <View styles={styles.contentContainer}>
        <LinearGradient
          colors={['#005466', '#0E0066']}
          style={{ padding: 15, alignItems: 'center', justifyContent: 'center', width: '100%', height: 650 }}>
            <ScrollView horizontal={true} style={{ flexWrap: 'nowrap', flexDirection: 'row', height: 400 }}>
            { this.props.deckList.length > 0 ? this.props.deckList.map(item => {
            return (<DeckComponent deck={item} key={'dckcmp'+ item.deckId} navigate={this.props.navigation.navigate}/>);
            }) : <View  style={{justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}><MaterialCommunityIcons name="cards-playing-outline" size={60} color='white' /><Text style={{margin: 8, fontWeight: 'bold', color: 'white', fontSize: 24}}>Sorry you must add a Deck.</Text></View> }
          </ScrollView>
          { this.props.deckList.length > 0 && <View style={{marginBottom: 64}}><Button title="Delete all"  color="#B0231A" onPress={() => this.deleteAll()}/></View>}
        </LinearGradient>
      </View>
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