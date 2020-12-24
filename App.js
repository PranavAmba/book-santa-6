import *as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import Login from './screens/loginScreen.js'
import {DrawerNavigator} from './Components/appDrawerNavigator.js'

export default class App extends React.Component {
  render(){
  return (
    <AppContainer></AppContainer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



const SwitchNavigator = createSwitchNavigator({
  Login:Login,
  Menu:DrawerNavigator
})

const AppContainer = createAppContainer(SwitchNavigator)