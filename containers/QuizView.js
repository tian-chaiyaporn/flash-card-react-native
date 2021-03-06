import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as DeckModel from '../utils/DeckModel'
import * as Notification from '../utils/Notification'
import { NavigationActions } from 'react-navigation'
import FlipCard from 'react-native-flip-card'

class QuizView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFinalScore: false,
      questionIndex: 0,
      score: 0,
      totalScore: 0,
      questions: [{
        question: 'please add your card first',
        answer: 'you can go back to do it'
      }]
    }
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  componentDidMount() {
    this.props.navigation.state.params.title && (
      DeckModel.getDeck(this.props.navigation.state.params.title)
        .then(payload => {
          if (payload.questions.length === 0) {
            return this.state.questions
          }
          return payload
        })
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
    const mainView = (
        <FlipCard
          style={{maxHeight: 200, width: 280, borderWidth: 0}}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={false}
          clickable={true}
        >
          <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#009688'}}>
            <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].question}</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#AD1457'}}>
            <Text style={styles.cardText}>{this.state.questions[this.state.questionIndex].answer}</Text>
          </View>
        </FlipCard>
      )

    return this.state.showFinalScore
      ? (
          <View style={styles.container}>
            <Text style={{fontSize: 40, color: '#AD1457', padding: 30, textAlign: 'center'}}>
              {`You've got ${this.state.score}/${this.state.totalScore} correct!`}
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={[styles.button, {backgroundColor: '#009688'}]}>
                <Text style={{color: '#FFF'}}>FINISH</Text>
              </View>
            </TouchableOpacity><TouchableOpacity onPress={() => {
              this.setState({ showFinalScore: false, questionIndex: 0, score: 0 })
            }}>
              <View style={[styles.button, {backgroundColor: '#AD1457'}]}>
                <Text style={{color: '#FFF'}}>RESTART</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      : (
          <View style={styles.container}>
            <Text style={{height: 20, marginTop: 15}}>{`${this.state.score}/${this.state.totalScore}`}</Text>
            <View style={[styles.halfView, {flex: 2}]}>
              {mainView}
            </View>

            <View style={styles.halfView}>
              <TouchableOpacity
                disabled={this.state.totalScore === 0 ? true : false}
                onPress={() => {
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
                disabled={this.state.totalScore === 0 ? true : false}
                onPress={() => {
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  halfView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 23,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    color: '#FFF'
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
