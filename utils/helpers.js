import { saveDeckTitle, addCardToDeck } from './api'

export const setDummyData = ()=>{
    saveDeckTitle('React')
    saveDeckTitle('Redux')
    saveDeckTitle('Native')
    addCardToDeck('React', {question: 'Dummy', answer: 'Data'})
    addCardToDeck('React', {question: 'DummyData', answer: 'Duh'})
    addCardToDeck('Native', {question: 'DummyNat', answer: 'Data'})
    addCardToDeck('Redux', {question: 'DummyRed', answer: 'Data'})
}
