import React from 'react'
import { AsyncStorage } from 'react-native'

export const initialDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function addInitialData(data) {
  return AsyncStorage.setItem('decks', JSON.stringify(data))
    .then(() => {return getAllDecks()})
}

export function removeAllDecks() {
  return AsyncStorage.removeItem('decks')
}

export function getAllDecks() {
  return AsyncStorage.getItem('decks')
    .then((payload) => {
      if (!payload) {
        return 'no data'
      }
      return JSON.parse(payload)
    })
    .catch((err) => {return err})
}
