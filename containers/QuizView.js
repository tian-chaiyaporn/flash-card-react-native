import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class QuizView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>QuizView Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default QuizView
