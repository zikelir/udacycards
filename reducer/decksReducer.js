
import { ADD_DECK, GET_DECKS } from '../actions/decksAction';
const initialState = {
  deckList: []
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
    default :
      return state
  }
}


export default decksReducer;