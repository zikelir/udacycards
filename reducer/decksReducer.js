
import { ADD_DECK } from '../actions/decksAction';

function decksReducer(state = {}, action) {
  switch (action.type) {
    case ADD_DECK :
      return {
        ...state,
        decks: decks.push(action.deck)
      }
    default :
      return state
  }
}


export default decksReducer;