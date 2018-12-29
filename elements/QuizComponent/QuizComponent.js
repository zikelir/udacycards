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
      return <Text style={{fontStyle: 'italic', textAlign: 'center'}}>{this.props.question.answer}</Text>
    } else {
      return <Text style={{color: 'transparent'}}>lorem</Text>
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.activeQuestion !== nextProps.activeQuestion) {
      this.setState({showAnswer: false});
      return true;
    }
  }

  render() {
    return (
      <View style={styles.quizCard}>
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.question ? this.props.question.question : 'No question'}</Text>
        {this.answer()}
        {
          this.state.showAnswer === false
          ?  <View style={{marginTop: 8}}><Button color="#005466" title="Show Answer" onPress={() => { this.showAnswer() }}/></View>
          : <View style={{marginTop: 8}}><Button color="#005466" title="Hide Answer" onPress={() => { this.showAnswer() }}/></View>
        }
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <View style={{width: '49%', marginRight: 8}}>
            <Button title="Correct" color='#1AB04D' onPress={() => this.props.increment()}></Button>
          </View>
          <View style={{width: '49%'}}>
            <Button title="Wrong" color='#B0231A' onPress={() => this.props.wrong()}></Button>
          </View>
        </View>
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
