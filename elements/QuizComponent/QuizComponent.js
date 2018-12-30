import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity  } from 'react-native';
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

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
     this.animatedValue.addListener(({ value }) => {
       this.value = value;
     })
     this.frontInterpolate = this.animatedValue.interpolate({
       inputRange: [0, 180],
       outputRange: ['0deg', '180deg'],
     })
     this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  componentWillUnmount() {
    this.flipCard();
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
         toValue: 0,
         friction: 8,
         tension: 10
       }).start();
     } else {
       Animated.spring(this.animatedValue,{
         toValue: 180,
         friction: 8,
         tension: 10
       }).start();
    }
  }

  resetCard = () => {
    if(this.value >= 90) {
      this.flipCard();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate  }
      ]
    }
    return (
      // <View style={styles.quizCard}>
      //   <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.question ? this.props.question.question : 'No question'}</Text>
      //   {this.answer()}
      //   {
      //     this.state.showAnswer === false
      //     ?  <View style={{marginTop: 8}}><Button color="#005466" title="Show Answer" onPress={() => { this.showAnswer() }}/></View>
      //     : <View style={{marginTop: 8}}><Button color="#005466" title="Hide Answer" onPress={() => { this.showAnswer() }}/></View>
      //   }
        // <View style={{flexDirection: 'row', marginTop: 8}}>
        //   <View style={{width: '49%', marginRight: 8}}>
        //     <Button title="Correct" color='#1AB04D' onPress={() => this.props.increment()}></Button>
        //   </View>
        //   <View style={{width: '49%'}}>
        //     <Button title="Wrong" color='#B0231A' onPress={() => this.props.wrong()}></Button>
        //   </View>
        // </View>
      // </View>
      <View style={styles.container}>
        <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
            <Text style={styles.flipText}>
             Question: {this.props.question.question}
            </Text>
            <View style={{margin: 64, width: '80%'}}><Button onPress={() => this.flipCard()} title="Show Answer" color="#48C2E9" /></View>
          </Animated.View>
          <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
            <Text style={[styles.flipText, {fontStyle: 'italic'}]}>
              Answer: {this.props.question.answer}
            </Text>
            <View style={{margin: 64, width: '80%'}}><Button onPress={() => this.flipCard()} title="Hide Answer" color="#487FE9"/></View>
          </Animated.View>
        </View>
        <View style={{flexDirection: 'row', margin: 8}}>
          <View style={{width: '49%', marginRight: 8}}>
            <Button title="Correct" color='#1AB04D' onPress={() => {this.props.increment(); this.resetCard(); }}></Button>
          </View>
          <View style={{width: '49%'}}>
            <Button title="Wrong" color='#B0231A' onPress={() => { this.props.wrong();  this.resetCard(); }}></Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 350,
    height: 350,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'justify',
    backgroundColor: '#487FE9',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "#48C2E9",
    position: "absolute",
    top: 0,
  },
  flipText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

// const styles = StyleSheet.create({
//   quizCard: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: 'gray',
//     margin: 8,
//     padding: 8,
//   }
// });

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
