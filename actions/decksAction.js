export const ADD_DECK = 'ADD_DECK';
export const GET_DECKS = 'GET_DECKS';
export const SET_SELECTED_DECK = 'SET_SELECTED_DECK';
export const DELETE_DECKS = 'DELETE_DECKS';

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

export function setSelectedDeck(deckId) {
  return {
    type: SET_SELECTED_DECK,
    payload: {
      deckId
    }
  }
}

export function deleteDecks() {
  return {
    type: DELETE_DECKS
  }
}