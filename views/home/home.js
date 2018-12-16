import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, ScrollView, View, StyleSheet } from 'react-native';
import DeckComponent from '../../elements/deckComponent/DeckComponent';
import { asyncGetDecks, asyncGetAll, initialArr, asyncDeleteDecks } from '../../utils/api';
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: []
    };
  }

  componentDidMount() {
    asyncGetDecks().then((result) => {
      if(result === null) {
        console.log('not');
        initialArr();
      }
    });

    asyncGetDecks().then((result) => {
      this.setState({deckList: result});
    });
   }

   componentWillReceiveProps(nextProps) {
     if(this.props.deckList !== nextProps.deckList) {
      asyncGetDecks().then((result) => {
          this.setState({deckList: result});
        });
       return true;
     }
   }

   generateDeckComponent = (deckList) => {
     if(deckList.length > 0) {
      deckList.map(item => {
        // console.log(item);
        return <Text>{item.deckName}</Text>
        // return (<View><DeckComponent deck={item}/></View>);
       })
     } else {
       return <Text>Sorry But no decks :(</Text>
     }
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
        { this.props.deckList.length > 0 ? this.props.deckList.map(item => {
        return (<DeckComponent deck={item} key={'dckcmp'+ item.id}/>);
       }) : <Text>Sorry but no cards</Text> }
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

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {
    deckList: state.decksReducer.deckList
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);