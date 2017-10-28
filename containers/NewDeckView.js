import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import * as DeckModel from '../utils/DeckModel'
import { NavigationActions } from 'react-navigation'

class NewDeckView extends Component {
  constructor() {
    super()
    this.state = {title: ''}
    this.addNewDeck = this.addNewDeck.bind(this)
    this.submitTitle = this.submitTitle.bind(this)
  }

  addNewDeck(value) {
    if (value.length > 30) {
      return
    }
    this.setState({title: value})
  }

  submitTitle(data) {
    if (data === '') {
      return
    }
    const navigateAction = NavigationActions.navigate({
      routeName: 'Home',
      params: {title: data},
      action: this.setState({refresh: true})
    })
    DeckModel.addNewDeck(data)
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
        <Text>Add Deck</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
          name="title"
          type="text"
          value={this.state.title}
          onChangeText={text => this.addNewDeck(text)}
        />
        <TouchableOpacity onPress={() => this.submitTitle(this.state.title)}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    width: 100,
    height: 50
  }
});

export default NewDeckView
