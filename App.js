import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import DeckList from './containers/DeckList'
import NewDeckView from './containers/NewDeckView'

const Tabs = TabNavigator({
    DeckList: {
      screen: DeckList,
      navigationOption: {
        tabBarLabel: 'Deck List'
      }
    },
    AddDeck: {
      screen: NewDeckView,
      navigationOption: {
        tabBarLabel: 'Add Deck'
      }
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? '#333' : '#fff',
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? '#fff' : '#333',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: Constants.statusBarHeight, backgroundColor: '#000'}}>
          <StatusBar translucent backgroundColor={'#000'} barStyle="light-content"/>
        </View>
        <MainNavigator />
        {/* <Tabs /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
