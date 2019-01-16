import { RECEIVE_DECKS, ADD_DECK, ADD_CARD_TO_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat(action.card)
        },
      }
    default :
      return state
  }
}

export default decks
