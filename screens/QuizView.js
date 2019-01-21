// Quiz View
// displays a card question
// an option to view the answer (flips the card)
// a "Correct" button
// an "Incorrect" button
// the number of cards left in the quiz
// Displays the percentage correct once the quiz is complete
import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { CenteredContainer, BigTitle, StyledButton, QuizCard } from '../components/styled'
import { formatScore, clearLocalNotifications } from '../utils/helpers'
import { connect } from 'react-redux'

class QuizView extends Component {
    static navigationOptions = ({navigation}) => {
    const { deck } = navigation.state.params
    return {
      title: deck
    }
  }

  state = {
    quizCards: [],
    totalCards: 0,
    currentCard: {question: '', answer: ''},
    correct: 0,
    ready: false,
    displayAnswer: false,
    complete: false
  }

  componentDidMount () {
    this.createQuiz()
  }

  createQuiz = () => {
    const { questions } = this.props.deckInfo
    this.setState({quizCards: []})

    for (i = 0; i < Math.floor(Math.random() * questions.length + 3); i ++ ){
      this.setState((prevState) => ({
        quizCards: [...prevState.quizCards, questions[Math.floor(Math.random() * questions.length)]],
        correct: 0,
        complete: false,
        ready: false,
        displayAnswer: false,
        cardColor: `rgb(${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150})`
      }))
    }
  }

  setFirstCard = () => {
    this.setState({ready: true, currentCard: this.state.quizCards[0], totalCards: this.state.quizCards.length})
  }

  flip = () => {
    this.setState((state) => ({displayAnswer: !state.displayAnswer}))
  }
  correct = () => {
    this.state.quizCards.shift()
    this.setState((state) => ({
      correct: state.correct + 1,
      currentCard: state.quizCards[0],
      displayAnswer: false,
      cardColor: `rgb(${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150})`
    }))
    if (this.state.quizCards.length === 0){
      this.setState({complete: true})
      clearLocalNotifications().then(setLocalNotification())
    }
  }

  incorrect = () => {
    this.state.quizCards.shift()
    this.setState((state) => ({
      currentCard: state.quizCards[0],
      displayAnswer: false,
      cardColor: `rgb(${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150})`
    }))
    if (this.state.quizCards.length === 0){
      this.setState({complete: true})
      clearLocalNotifications().then(setLocalNotification())
    }
  }

  render(){
    const { currentCard, totalCards, quizCards, correct, complete, ready, displayAnswer, cardColor } = this.state
    if (ready === false) {
      return (
        <CenteredContainer>
          <BigTitle>This Quiz contains {quizCards.length} cards!</BigTitle>
          <BigTitle>Are you ready?!</BigTitle>
          <StyledButton backgroundColor="rgb(190,230,190)" borderLineColor="rgb(200,250,200)" onPress={this.setFirstCard}>
            <BigTitle color="#F6F6F6">Start!</BigTitle>
          </StyledButton>
          <StyledButton onPress={this.createQuiz}>
            <BigTitle>Re-Shuffle</BigTitle>
          </StyledButton>
        </CenteredContainer>
      )
    }
    if (complete) {
      return (
        <CenteredContainer>
          <BigTitle>Result!</BigTitle>
          <BigTitle>Score: {formatScore(correct, totalCards)}%</BigTitle>
          <StyledButton onPress={this.createQuiz}>
            <BigTitle>Try Again!</BigTitle>
          </StyledButton>
        </CenteredContainer>
      )
    }
    return(
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 14}}>Score: {correct}</Text>
            <Text style={{fontSize: 14}}>Cards Left on Quiz: {quizCards.length}/{totalCards}</Text>
          </View>
          <QuizCard backgroundColor={cardColor}>
            <BigTitle>{displayAnswer ? 'Answer:' : 'Question:'}</BigTitle>
            <BigTitle style={{textAlign: 'justify'}}>{displayAnswer ? currentCard.answer : currentCard.question}</BigTitle>
          </QuizCard>
          <StyledButton onPress={this.flip}>
            <BigTitle>Flip</BigTitle>
          </StyledButton>
          { displayAnswer &&
            <View>
              <StyledButton backgroundColor="rgb(190,230,190)" borderLineColor="rgb(200,250,200)" onPress={this.correct}>
                <Text>Button: Correct </Text>
              </StyledButton>
              <StyledButton backgroundColor="rgb(230,120,130)" borderLineColor="rgb(255,200,200)" onPress={this.incorrect}>
                <Text>Button: Incorrect </Text>
              </StyledButton>
            </View>
          }
        </View>
    )
  }
}

function mapStateToProps(decks, {navigation}){
  return{
    deckInfo: decks[navigation.state.params.deck]
  }
}


export default connect(mapStateToProps)(QuizView)
