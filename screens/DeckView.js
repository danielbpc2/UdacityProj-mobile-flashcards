// Individual Deck View
// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { CenteredContainer, BigTitle, StyledButton } from '../components/styled'

class DeckView extends Component {
    static navigationOptions = ({navigation}) => {
    const { deck } = navigation.state.params
    return {
      title: deck
    }
  }

  render(){
    const {
      title,
      questions
    } = this.props.deckInfo

    return(
      <CenteredContainer>
        <BigTitle>Deck: {title}</BigTitle>
        <BigTitle>Question cards - {questions.length} {questions.length === 1 ? 'card' : 'cards'}</BigTitle>

        <StyledButton onPress={() => this.props.navigation.navigate('NewQuestion', {deck: title})}>
          <BigTitle>Add Cards to this deck</BigTitle>
        </StyledButton>
        {questions.length !== 0
          ?
          <StyledButton backgroundColor="rgb(190,230,190)" borderLineColor="rgb(200,250,200)">
            <BigTitle onPress={() => this.props.navigation.navigate('Quiz', {deck: title}) } color='#fff'>Play a Quiz</BigTitle>
          </StyledButton>
          : null
        }
      </CenteredContainer>
    )
  }
}

function mapStateToProps(decks, {navigation}){
  return{
    deckInfo: decks[navigation.state.params.deck]
  }
}

export default connect(mapStateToProps)(DeckView)
