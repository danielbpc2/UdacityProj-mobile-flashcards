// Deck List View (Default View)
// displays the title of each Deck
// displays the number of cards in each deck
import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { CenteredContainer, BigTitle } from '../components/styled'
import { getDecks, addCardToDeck } from '../utils/api'
import { receiveDecks, addCardDeck } from '../actions'
import { connect } from 'react-redux'

class DeckListView extends Component {
  componentDidMount(){
    getDecks().then(data => {
      this.props.dispatch(receiveDecks(data))
    })
  }

  render(){
    const { decks }= this.props

    if(decks.length === 0){
     return (
       <CenteredContainer>
        <BigTitle>
          You don't have any decks yet.
        </BigTitle>
      </CenteredContainer>
      )
    }
    return(
      <CenteredContainer>
        {decks.map(deck => (
          <BigTitle key={deck.title}> {deck.title} - {deck.questions.length} Cards</BigTitle>
          ))
        }
      </CenteredContainer>
    )
  }
}
function mapStateToProps (decks) {
  const deckArray = []
  Object.keys(decks).map(deck => deckArray.push(decks[deck]))
  return {
    decks: deckArray.sort((x,y) => y.questions.length - x.questions.length )
  }
}

export default connect(mapStateToProps)(DeckListView)
