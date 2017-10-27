import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class DeckView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DeckView Page  {this.props.navigation.state.params.title}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'QuizView',
            { title: this.props.navigation.state.params.title }
          )}
        >
          <View style={styles.button}>
            <Text>Start Quiz</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'NewQuestionView',
            { title: this.props.navigation.state.params.title }
          )}
        >
          <View style={styles.button}>
            <Text>Add Question</Text>
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

export default DeckView
