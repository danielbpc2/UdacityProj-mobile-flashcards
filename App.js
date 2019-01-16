import React from 'react';
import { setDummyData, setDummyCards } from './utils/helpers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Constants } from 'expo'
// components
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { DeckListView, DeckView, NewDeckView, NewQuestionView, QuizView } from './screens'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const routes = {
    'Deck List': DeckListView,
    // DeckView: DeckView,
    'New Deck': NewDeckView,
    // NewQuestion: NewQuestionView,
    // Quiz: QuizView
  }

const tabOptions = {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName){
          case 'Deck List' :
          return <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
          case 'New Deck' :
          return <MaterialIcons name="create-new-folder" size={30} color={tintColor} />
      }
    },
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Platform.OS === 'ios' ?  '#222222': 'white',
      style: {
        shadowRadius: 6,
        height: 70,
        backgroundColor: Platform.OS === 'ios' ? '#F6F6F6' : '#222222',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
      },
    },
  })
}

const Tabs = Platform.OS === "ios" ? createBottomTabNavigator(routes, tabOptions) : createMaterialTopTabNavigator(routes, tabOptions);

const stackRoutes = {
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView:{
    screen: DeckView,
  },
  NewQuestion: {
    screen: NewQuestionView,
  }
}

const stackOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "ios" ? '#fff' : '#222222',
      height: 40,
    },
    headerTintColor: Platform.OS === "ios" ? '#222222' : '#fff',
  }
}

const StackNavigator = createAppContainer(createStackNavigator(stackRoutes, stackOptions))

const MStatusBar = ({backgroundColor, ...props}) => {
  return(
    <View style={{backgroundColor: backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
    )
}

export default class App extends React.Component {
  componentDidMount(){
    setDummyData()
    setDummyCards()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MStatusBar backgroundColor='#222222' barStyle='light-content'/>
          <StackNavigator/>
        </View>
      </Provider>
    );
  }
}

// TODO:
// Specific Requirements
// Allow users to create a deck which can hold an unlimited number of cards.
// Allow users to add a card to a specific deck.
// The front of the card should display the question.
// The back of the card should display the answer.
// Users should be able to quiz themselves on a specific deck and receive a score once they're done.
// Users should receive a notification to remind themselves to study if they haven't already for that day.
