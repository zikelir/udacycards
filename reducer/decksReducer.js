
import { ADD_DECK, GET_DECKS, DELETE_DECKS, SET_SELECTED_DECK, SET_SELECTED_DECKID, ADD_QUESTION } from '../actions/decksAction';
const initialState = {
  deckList: [],
  selectedDeck: '',
  questionLength: 0,
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
      case SET_SELECTED_DECKID :
      return {
        ...state,
        selectedDeckId: action.payload.selectedDeckId
      }
    case DELETE_DECKS :
      return {
        ...state,
        selectedDeck: '',
        deckList: [],
      }
    case ADD_QUESTION :
      return {
        ...state,
        questionLength: state.questionLength + 1,
        deckList: state.deckList.map(item => {
          if(item.deckId === action.payload.question.selectedDeckId) {
            item.questions.push({ question: action.payload.question.question, answer: action.payload.question.answer });
            return item;
          } else {
            return item;
          }
        })
      }
    default :
      return state
  }
}


export default decksReducer;