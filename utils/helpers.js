import { saveDeckTitle, addCardToDeck } from './api'

export const setDummyData = ()=>{
    saveDeckTitle('React')
    saveDeckTitle('Redux')
    saveDeckTitle('Native')
}

export const setDummyCards = () => {
    addCardToDeck('React', {question: 'Dummy', answer: 'Data'})
    addCardToDeck('Native', {question: 'DummyNat', answer: 'Data'})
    addCardToDeck('Redux', {question: 'DummyRed', answer: 'Data'})
  }
