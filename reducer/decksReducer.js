

function decksReducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_DECK' :
      return {
        ...state
      }
    default :
      return state
  }
}


export default decksReducer;