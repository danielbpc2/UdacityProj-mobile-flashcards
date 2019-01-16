// To manage your AsyncStorage database, you'll want to create four different helper methods.
import { AsyncStorage } from 'react-native'

const DECKKEY = 'Decks'
// getDecks: return all of the decks along with their titles, questions, and answers.
export const getDecks = () => {
  return AsyncStorage.getItem(DECKKEY).then(JSON.parse)
}
// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(deckName) {
  return AsyncStorage
    .getItem(DECKKEY)
    .then((result) => {
      if (result !== null) {
        return JSON.parse(result)[deckName];
      }
    });
}

// saveDeckTitle: take in a single title argument and add it to the decks.
export const saveDeckTitle = (deckName) => {
  return AsyncStorage.mergeItem(DECKKEY, JSON.stringify({ [deckName]: {title: deckName, questions: [] } } ) )
}

// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export const addCardToDeck = (deckName, card) => {
  getDeck(deckName)
  .then(data => {
    const newCards = {questions: [...data.questions, card]}
    return AsyncStorage.mergeItem(DECKKEY, JSON.stringify({[deckName]: newCards}))
  })
}

export function clearStorage() {
  return AsyncStorage.clear();
}
