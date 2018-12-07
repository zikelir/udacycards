import React from 'react';
import { Button } from 'react-native';
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Decks',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Deck', {name: 'Jayiuhune'})}
      />
    );
  }
}

export default HomeScreen;