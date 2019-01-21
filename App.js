import React from 'react';
import { setDummyData, setDummyCards, setLocalNotification } from './utils/helpers'
import { StackNavigator } from './utils/navigator'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
// components
import { View, Platform, StatusBar } from 'react-native';
import store from './utils/store'

const MStatusBar = ({backgroundColor, ...props}) => {
  return(
    <View style={{backgroundColor: backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
    )
}

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MStatusBar backgroundColor='#222222' barStyle='light-content'/>
          <StackNavigator/>
        </View>
      </Provider>
    );
  }
}
