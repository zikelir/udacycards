
import { ADD_DECK, GET_DECKS, DELETE_DECKS, SET_SELECTED_DECK } from '../actions/decksAction';
const initialState = {
  deckList: [],
  selectedDeck: ''
}

function decksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DECK :
      return {
        ...state,
       deckList: [...state.deckList, action.payload.deck]
      }
    case GET_DECKS :
      return {
        ...state
      }
    case SET_SELECTED_DECK :
      return {
        ...state,
        selectedDeck: action.payload.selectedDeck
      }
    case DELETE_DECKS :
      return {
        ...state,
        selectedDeck: '',
        deckList: [],
      }
    default :
      return state
  }
}


export default decksReducer;