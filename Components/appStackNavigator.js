import *as React from 'react';
import Donate from '../screens/donateScreen.js'
import RecevierDetails from '../screens/recevierDetails.js'
import {createStackNavigator} from 'react-navigation-stack'

export const StackNavigator=createStackNavigator({
    Donate:{
        screen:Donate,
        navigationOptions:{
            headerShown:false
        }
    },
    Details:{
        screen:RecevierDetails,
        navigationOptions:{
            headerShown:false
        }
    }
},{
    initialRouteName:'Donate'
})