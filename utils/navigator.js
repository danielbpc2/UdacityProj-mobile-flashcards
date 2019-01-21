import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { DeckListView, DeckView, NewDeckView, NewQuestionView, QuizView } from '../screens'
import { Platform } from 'react-native';

const routes = {
    'Deck List': DeckListView,
    'New Deck': NewDeckView,
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
  },
  Quiz: {
    screen: QuizView,
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

export const StackNavigator = createAppContainer(createStackNavigator(stackRoutes, stackOptions))
