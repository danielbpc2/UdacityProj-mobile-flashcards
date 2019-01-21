import React, {Component} from 'react'
import { View, Text, Animated } from 'react-native'
import { CenteredContainer, BigTitle, StyledButton, QuizCard } from '../components/styled'
import { formatScore, clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

const AnimatedBigTitle = Animated.createAnimatedComponent(BigTitle)
const AnimatedCard = Animated.createAnimatedComponent(QuizCard)

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
    complete: false,
    reShuffleValue: new Animated.Value(0),
    flipValue: new Animated.Value(0),
    nextValue: new Animated.Value(0)
  }

  componentDidMount () {
    this.createQuiz()
  }

  textRotateAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.reShuffleValue, {toValue: 2, duration: 250}),
      Animated.timing(this.state.reShuffleValue, {toValue: 1, duration: 250}),
      Animated.timing(this.state.reShuffleValue, {toValue: 0, duration: 250}),
    ]).start()
  }

  createQuiz = () => {
    const { questions } = this.props.deckInfo
    this.setState({quizCards: []})
    for (let i = 0; i < questions.length; i ++ ){
      this.setState((prevState) => ({
        quizCards: [...prevState.quizCards, questions[i]],
        correct: 0,
        complete: false,
        ready: false,
        displayAnswer: false,
        cardColor: `rgb(${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150})`
      }))
    }
  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  setFirstCard = () => {
    this.setState({ready: true, currentCard: this.state.quizCards[0], totalCards: this.state.quizCards.length})
  }

  flip = () => {
    this.setState((state) => ({displayAnswer: !state.displayAnswer}))
    Animated.sequence([
      Animated.timing(this.state.flipValue, {toValue: 360, duration: 500}),
    ]).start(this.state.flipValue.resetAnimation())
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
    Animated.sequence([
      Animated.timing(this.state.nextValue, {toValue: 1000, duration: 250}),
      Animated.timing(this.state.nextValue, {toValue: 0, duration: 250}),
    ]).start()
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

    Animated.sequence([
      Animated.timing(this.state.nextValue, {toValue: 1000, duration: 250}),
      Animated.timing(this.state.nextValue, {toValue: 0, duration: 250}),
    ]).start()
  }

  render(){
    const {
      currentCard,
      totalCards,
      quizCards,
      correct,
      complete,
      ready,
      displayAnswer,
      cardColor,
      reShuffleValue,
      flipValue,
      nextValue
    } = this.state

    const spin = reShuffleValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '2deg', '-2deg']
    })

    const flip = flipValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg']
    })

    if (ready === false) {
      return (
        <CenteredContainer>
          <AnimatedBigTitle
            style={{transform: [{rotate: spin}]}}

          >This Quiz contains {quizCards.length} cards!</AnimatedBigTitle>
          <BigTitle>Are you ready?!</BigTitle>
          <StyledButton backgroundColor="rgb(190,230,190)" borderLineColor="rgb(200,250,200)" onPress={this.setFirstCard}>
            <BigTitle color="#F6F6F6">Start!</BigTitle>
          </StyledButton>
          <StyledButton onPress={() => { this.textRotateAnimation(); this.shuffle(quizCards) } }>
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
          <StyledButton onPress={() => (this.props.navigation.dispatch(NavigationActions.back()))}>
            <BigTitle>Back To Deck</BigTitle>
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
          <AnimatedCard
            style={{transform: [{rotateY: flip}, {translateX: nextValue}]}}
            backgroundColor={cardColor}>
            <BigTitle>{displayAnswer ? 'Answer:' : 'Question:'}</BigTitle>
            <BigTitle style={{textAlign: 'justify'}}>{displayAnswer ? currentCard.answer : currentCard.question}</BigTitle>
          </AnimatedCard>
          <StyledButton onPress={this.flip}>
            <BigTitle>Flip</BigTitle>
          </StyledButton>
          { displayAnswer &&
            <View>
              <StyledButton backgroundColor="rgb(190,230,190)" borderLineColor="rgb(200,250,200)" onPress={this.correct}>
                <BigTitle color='white'>Correct </BigTitle>
              </StyledButton>
              <StyledButton backgroundColor="rgb(230,120,130)" borderLineColor="rgb(255,200,200)" onPress={this.incorrect}>
                <BigTitle color='white'>Incorrect </BigTitle>
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
