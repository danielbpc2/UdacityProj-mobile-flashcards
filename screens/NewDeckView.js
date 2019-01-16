// New Deck View
// An option to enter in the title for the new deck
// An option to submit the new deck title
import React, {Component} from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { CenteredContainer, BigTitle, StyledFormInput, StyledButton } from '../components/styled'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class NewDeckView extends Component {
  state = {
    title: '',
  }

  submit = () => {
    const { title } = this.state
    const { dispatch } = this.props

    dispatch(addDeck(title))
    saveDeckTitle(title)

    this.setState({title: ''})

    this.goBack()
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'New Deck'
    }))
  }

  render(){
    return(
        <KeyboardAvoidingView behavior='padding' style={{flex: 1, textAlign: 'center', justifyContent: 'flex-start', alignItems: 'center', padding: 20}}>
          <BigTitle>
            Create a new Deck
          </BigTitle>
          <StyledFormInput
              placeholder="Type Here the name of your Deck!"
              onChangeText={(text) => this.setState({title: text})}
              value={this.state.title}
            />
          <StyledButton onPress={this.submit}>
            <Text style={{fontSize: 20}}>Create Deck</Text>
          </StyledButton>
        </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeckView)
