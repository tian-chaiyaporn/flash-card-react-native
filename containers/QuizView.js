import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as DeckModel from '../utils/DeckModel'
import * as Notification from '../utils/Notification'

class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flip: false,
      showFinalScore: false,
      questionIndex: 0,
      score: 0,
      totalScore: 0,
      questions: [{
        question: 'initial',
        answer: 'initial'
      }]
    }
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  componentDidMount() {
    this.props.navigation.state.params.title && (
      DeckModel.getDeck(this.props.navigation.state.params.title)
        .then(payload => this.setState({
          questions: payload.questions,
          totalScore: payload.questions.length
        }))
        .catch(err => err)
      )
  }

  componentDidUpdate() {
    this.state.showFinalScore && (Notification.clearLocalNotification())
  }

  render() {
    const mainView = !this.state.flip
    ? <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].question}</Text>
    : <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].answer}</Text>

    return this.state.showFinalScore
      ? (
          <View style={styles.container}>
            <Text>{`${this.state.score}/${this.state.totalScore}`}</Text>
          </View>
        )
      : (
          <View style={styles.container}>
            <View style={[styles.halfView, {flex: 2}]}>
              {mainView}
              <TouchableOpacity onPress={ () => this.setState((state) => {return {flip: !state.flip}}) }>
                <View style={styles.button}>
                  <Text style={{color: '#AD1457', zIndex: 1000}}>FLIP CARD</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.halfView}>
              <TouchableOpacity
                onPress={() => {
                  this.state.flip === true && this.setState({flip: false})
                  this.setState((state) => {
                    return (state.questionIndex + 1 === state.totalScore)
                    ? {score: state.score + 1, showFinalScore: true}
                    : {score: state.score + 1, questionIndex: state.questionIndex + 1}
                  })
                }}
              >
                <View style={[styles.button, {backgroundColor: '#009688'}]}>
                  <Text style={{color: '#FFF'}}>CORRECT</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.state.flip === true && this.setState({flip: false})
                  this.setState((state) => {
                    return (state.questionIndex + 1 === state.totalScore)
                    ? {showFinalScore: true}
                    : {questionIndex: state.questionIndex + 1}
                  })
                }}
              >
                <View style={[styles.button, {backgroundColor: '#AD1457'}]}>
                  <Text style={{color: '#FFF'}}>INCORRECT</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  halfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 25,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#000',
    width: 150,
    height: 40,
    marginBottom: 10
  }
});

export default QuizView
