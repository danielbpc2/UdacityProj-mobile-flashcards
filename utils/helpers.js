import { saveDeckTitle, addCardToDeck } from './api'
import { AsyncStorage } from 'react-native'
import {Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = 'QuizNotifications'

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

export const formatScore = (correct, questions) => {
  const x = correct / (questions / 100)
  return Math.floor(x)
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}


function createNotification () {
  return {
    title: "Quiz!",
    body: "How about a quiz to wise up?",
    'ios': {
      sound: true
    },
    'android': {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
  .then(data => {
    if(data === null){
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
        if(status === 'granted'){
          Notifications.cancelAllScheduledNotificationsAsync()

          var tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(14)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(createNotification(), {time: tomorrow, repeat: 'day'})

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}
