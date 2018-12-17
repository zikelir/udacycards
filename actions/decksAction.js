export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';
export const SET_SELECTED_DECK = 'SET_SELECTED_DECK';
export const DELETE_DECKS = 'DELETE_DECKS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    payload: {
      deck
    }
  }
}

export function getDecks() {
  return {
    type: GET_DECKS
  }
}

export function setSelectedDeck(selectedDeck) {
  return {
    type: SET_SELECTED_DECK,
    payload: {
      selectedDeck
    }
  }
}

export function deleteDecks() {
  return {
    type: DELETE_DECKS
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    payload: {
      question
    }
  }
}