import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const CenteredContainer = styled.View`
  flex-grow: 1;
  background-Color: #fff;
  align-items: center;
  justify-content: center;
`
export const BigTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.color || "#222222"};
`
export const StyledFormInput = styled.TextInput`
  border: solid 1px #222222;
  padding:10px;
  border-radius: 2px;
  margin: 5px;
  width: 100%;
`
export const StyledButton = styled.TouchableOpacity`
  font-weight: bold;
  border: solid 1px ${props => props.borderLineColor || "#222222"};
  padding: 10px 20px;
  border-radius: 25px;
  margin: 10px;
  background-color: ${props => props.backgroundColor || "rgba(0,0,0,0)"};
`
export const DeckCard = styled.TouchableHighlight`
  border: solid 1px ${Platform.OS === 'ios' ? '#F9F9F9' : '#F9F9F9' };
  border-radius: 5px;
  padding: 30px;
  margin-bottom: 6px;
  background-color: rgb(250,250,250);
`
export const QuizCard = styled.View`
  height: 200px;
  width: 100%;
  background-color: ${props => props.backgroundColor || `rgb(${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150},${ Math.floor(Math.random() * (255 - 150)) + 150});`}
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
