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

  renderDeckItem(obj) {
    return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'DeckView',
            { title: obj.item }
          )}
        >
          <View style={styles.item}>
            <Text>{obj.item}</Text>
          </View>
        </TouchableOpacity>
    )
  }

  render() {
    const items = []
    const data = this.state.decks
    for (const key in data) {
      items.push(data[key].title)
    }
    return (
      <View style={styles.container}>
        <Text>DeckList Page</Text>
        <FlatList
          data={items}
          renderItem={this.renderDeckItem}
          keyExtractor={item => item}
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#000',
    backgroundColor: '#eee'
  }
});

export default DeckList
