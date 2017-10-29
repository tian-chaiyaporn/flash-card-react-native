import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import * as DeckModel from '../utils/DeckModel'
import { NavigationActions } from 'react-navigation'

class NewQuestionView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      answer: '',
      title: this.props.navigation.state.params.title
    }
    this.addNewQuestion = this.addNewQuestion.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
  }

  static navigationOptions = {
    title: 'Add Card'
  }

  addNewQuestion(value) {
    if (value.length > 100) {
      return
    }
    this.setState({question: value})
  }

  addNewAnswer(value) {
    if (value.length > 100) {
      return
    }
    this.setState({answer: value})
  }

  submitQuestion(title, question, answer) {
    if (question === '' || answer === '') {
      return
    }

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'DeckView',
          params: {title: title, refresh: true}
        })
      ]
    })

    DeckModel.addNewQuestion(title, question, answer)
      .then(() => {
        this.props.navigation.dispatch(resetAction)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="adding"
      >
        <TextInput
          style={styles.inputBox}
          placeholder="your question"
          name="question"
          type="text"
          value={this.state.question}
          onChangeText={text => this.addNewQuestion(text)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="your answer"
          name="answer"
          type="text"
          value={this.state.answer}
          onChangeText={text => this.addNewAnswer(text)}
        />
        <TouchableOpacity onPress={() => this.submitQuestion(this.state.title, this.state.question, this.state.answer)}>
          <View style={styles.button}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    padding: 10,
    width: 280,
    height: 50,
    marginTop: 25
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#000',
    width: 150,
    height: 40,
    marginTop: 30
  }
});

export default NewQuestionView
