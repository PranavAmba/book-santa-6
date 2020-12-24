import *as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import { TabNavigator } from './tabNavigator';
import CustomSideBarMenu from './CSBM.js'
import Settings from '../screens/settings.js'
import MyDonations from '../screens/myDonations';
import Notification from '../screens/notification.js'

export const DrawerNavigator=createDrawerNavigator({
    Home:{screen:TabNavigator},
    Settings:{screen:Settings},
    MyDonations:{screen:MyDonations},
    Notification:{screen:Notification}
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'
})