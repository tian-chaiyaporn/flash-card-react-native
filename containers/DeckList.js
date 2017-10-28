import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import * as DeckModel from '../utils/DeckModel'

class DeckList extends Component {
  constructor(props) {
    super(props)
    this.state = { decks: {} }
    this.renderDeckItem = this.renderDeckItem.bind(this)
  }

  componentDidMount() {
    DeckModel.getAllDecks()
      .then(payload => {
        if (payload === 'no data') {
          DeckModel.addInitialData(DeckModel.initialDecks)
            .then(data => this.setState({decks: data}));
        } else {
          this.setState({decks: payload})
        }
      })
  }

  componentDisUpdate() {
    DeckModel.getAllDecks()
      .then(payload => {
        this.setState({decks: payload, refresh: false})
      })
  }

  renderDeckItem(obj) {
    return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'DeckView',
            { title: obj.item.title }
          )}
        >
          <View style={styles.item}>
            <Text style={styles.titleText}>{obj.item.title}</Text>
            <Text style={styles.subtitleText}>{`${obj.item.questions.length} cards`}</Text>
          </View>
        </TouchableOpacity>
    )
  }

  render() {
    const items = []
    const data = this.state.decks
    for (const key in data) {
      items.push(data[key])
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderDeckItem}
          keyExtractor={item => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#eee'
  },
  titleText: {
    fontSize: 22
  },
  subtitleText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555'
  }
});

export default DeckList
