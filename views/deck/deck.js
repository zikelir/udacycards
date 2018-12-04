import React from 'react';
import { Button } from 'react-native';
class DeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Jane's dsadsaprofile"
        onPress={() => navigate('Home', {name: 'Jayiuhune'})}
      />
    );
  }
}

export default DeckScreen;