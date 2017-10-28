import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as DeckModel from '../utils/DeckModel'

class DeckView extends Component {
  constructor(props) {
    super(props)
    this.state = {cards: 0}
  }

  static navigationOptions = {
    title: 'Deck View'
  }

  componentDidMount() {
    DeckModel.getDeck(this.props.navigation.state.params.title)
      .then((data) => {
        this.setState({cards: data.questions.length})
      })
      .catch(err => console.log('fail to get deck info', err))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfView}>
          <Text style={styles.titleText}>{this.props.navigation.state.params.title}</Text>
          <Text style={styles.subtitleText}>{`${this.state.cards} cards`}</Text>
        </View>

        <View style={styles.halfView}>
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
            <View style={[styles.button, {backgroundColor: '#000'}]}>
              <Text style={{color: '#fff'}}>Add Question</Text>
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
  titleText: {
    fontSize: 30
  },
  subtitleText: {
    marginTop: 10,
    fontSize: 20,
    color: '#555'
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

export default DeckView
