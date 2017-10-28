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
    ? <Text>{this.state.questions[this.state.questionIndex].question}</Text>
    : <Text>{this.state.questions[this.state.questionIndex].answer}</Text>

    return this.state.showFinalScore
      ? (
          <View style={styles.container}>
            <Text>{`${this.state.score}/${this.state.totalScore}`}</Text>
          </View>
        )
      : (
          <View style={styles.container}>
            <Text>QuizView Page {this.props.navigation.state.params.title}</Text>

            {mainView}

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
              <View style={styles.button}>
                <Text>CORRECT</Text>
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
              <View style={styles.button}>
                <Text>INCORRECT</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.setState((state) => {return {flip: !state.flip}}) }>
              <View style={styles.button}>
                <Text>FLIP CARD</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    width: 100,
    height: 50
  }
});

export default QuizView
