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
    
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'DeckView',
          params: {title: data, refresh: true}
        })
      ]
    })

    DeckModel.addNewDeck(data)
      .then(() => {
        this.props.navigation.dispatch(resetAction)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Text style={styles.titleText}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Deck Title"
          name="title"
          type="text"
          value={this.state.title}
          onChangeText={text => this.addNewDeck(text)}
        />
        <TouchableOpacity onPress={() => this.submitTitle(this.state.title)}>
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
  titleText: {
    padding: 30,
    fontSize: 30,
    textAlign: 'center'
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
    marginBottom: 20
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#000',
    width: 150,
    height: 40,
    marginBottom: 10
  }
});

export default NewDeckView
