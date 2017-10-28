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

    const navigateAction = NavigationActions.navigate({
      routeName: 'DeckView',
      params: {title: title}
    })
    DeckModel.addNewQuestion(title, question, answer)
      .then(() => {
        this.props.navigation.dispatch(navigateAction)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Text>Add New Question</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
          name="question"
          type="text"
          value={this.state.question}
          onChangeText={text => this.addNewQuestion(text)}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
          name="answer"
          type="text"
          value={this.state.answer}
          onChangeText={text => this.addNewAnswer(text)}
        />
        <TouchableOpacity onPress={() => this.submitQuestion(this.state.title, this.state.question, this.state.answer)}>
          <View style={styles.button}>
            <Text>{'Submit'}</Text>
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
  }
});

export default NewQuestionView
