import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { setSelectedDeck } from '../../actions/decksAction';

class QuizComponent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        showAnswer: false,
      };
  }

  showAnswer = () => {
    this.state.showAnswer === false ? this.setState({showAnswer: true}) : this.setState({showAnswer: false});
  }

  answer = () => {
    if(this.state.showAnswer === true) {
      return <Text>{this.props.question.answer}</Text>
    } else {
      return <Text style={{color: 'transparent'}}>lorem</Text>
    }
  }

  render() {
    return (
      <View style={styles.quizCard}>
        <Text>{this.props.question.question}</Text>
        {this.answer()}
        {
          this.state.showAnswer === false ? <Button title="Show Answer" onPress={() => { this.showAnswer() }}/> : <Button title="Hide Answer" onPress={() => { this.showAnswer() }}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quizCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
    padding: 8,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDeck: state.decksReducer.selectedDeck
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizComponent);
