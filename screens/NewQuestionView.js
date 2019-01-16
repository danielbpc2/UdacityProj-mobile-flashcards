// New Question View
// An option to enter in the question
// An option to enter in the answer
// An option to submit the new question
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addCardDeck } from '../actions'
import { addCardToDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
// Components
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { CenteredContainer, BigTitle, StyledFormInput, StyledButton } from '../components/styled'

class NewQuestionView extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({navigation}) => {
    const { deck } = navigation.state.params
    return {
      title: deck
    }
  }

  submit = () => {
    const { question, answer } = this.state
    const { dispatch } = this.props
    const { deck } = this.props.navigation.state.params

    dispatch(addCardDeck(deck, {question, answer}))
    addCardToDeck(deck, {question, answer})

    this.setState({question: '', answer: ''})

    this.goBack()
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render(){
    return(
      <KeyboardAvoidingView behavior='padding' style={{flex: 1, textAlign: 'center', justifyContent: 'flex-start', alignItems: 'center', padding: 20}}>
        <BigTitle>
          Create a new card
        </BigTitle>
        <StyledFormInput
            placeholder="Your Question?"
            onChangeText={(text) => this.setState({question: text})}
            value={this.state.title}
          />
        <StyledFormInput
            placeholder="Your Answer!"
            onChangeText={(text) => this.setState({answer: text})}
            value={this.state.title}
          />
        <StyledButton onPress={this.submit}>
          <Text style={{fontSize: 20}}>Create Card</Text>
        </StyledButton>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewQuestionView)
