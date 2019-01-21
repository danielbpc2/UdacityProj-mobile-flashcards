import React, {Component} from 'react'
import { View, Text, FlatList, Platform } from 'react-native'
import { CenteredContainer, BigTitle, DeckCard } from '../components/styled'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

class DeckListView extends Component {
  componentDidMount(){
    getDecks().then(data => {
      this.props.dispatch(receiveDecks(data))
    })
  }

  renderItem = ({item}) => (
      <DeckCard underlayColor="rgb(200,200,200)" onPress={() => this.props.navigation.navigate('DeckView', {deck: item.title}) }>
       <BigTitle>{item.title} - {item.questions.length} {item.questions.length > 1 ? "Cards" : "Card"}</BigTitle>
      </DeckCard>
   )

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
      <FlatList
        style={{backgroundColor: Platform.OS === 'ios' ? '#F6F6F6' : '#222222'}}
        data={decks}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.title}
        />
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
