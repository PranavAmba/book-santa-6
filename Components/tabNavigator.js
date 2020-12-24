import *as React from 'react';
import {StackNavigator} from './appStackNavigator.js'
import Request from '../screens/requestScreen.js'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Image} from 'react-native'

export const TabNavigator = createBottomTabNavigator({
    Request:{
      screen:Request,
      navigationOptions:{
        tabBarIcon:<Image source={require('../assets/request-book.png')} style={{width:50,height:50}}></Image>,
        tabBarLabel:'Request books'
      }
    },
    Donate:{
      screen:StackNavigator,
      navigationOptions:{
        tabBarIcon:<Image source={require('../assets/request-list.png')} style={{width:50,height:50}}></Image>,
        tabBarLabel:'Donate books'
      }
    }
  })