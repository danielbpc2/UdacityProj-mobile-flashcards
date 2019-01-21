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

  handleChange({question, answer}) {
    if (question)
        this.setState({ question });
    else if (answer)
        this.setState({ answer });
  }

  submit = () => {
    const { question, answer } = this.state
    const { dispatch } = this.props
    const { deck } = this.props.navigation.state.params

    if(!question) {
      return alert("You need to write your question!")
    }

    if(!answer) {
      return alert("You need to write your answer!")
    }

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
            onChangeText={(text) => this.handleChange({question: text})}
            value={this.state.title}
            maxLength={120}
          />
        <StyledFormInput
            placeholder="Your Answer!"
            onChangeText={(text) => this.handleChange({answer: text})}
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
