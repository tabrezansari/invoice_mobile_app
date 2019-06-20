
import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} 
from 'react-native';


import home from './home';
import invoice from './invoice';
import login from './login';
import profile from './profile';
import editprofile from './editprofile';
import verify from './verify';
import Splash from './Splash';
import pinset from './pinset';



const MainScreenNavigator = StackNavigator({
       
Splash: { screen: Splash },

home: { screen: home },
invoice: { screen: invoice },

pinset: { screen: pinset },

login: { screen: login },

profile: { screen: profile },
editprofile: { screen: editprofile },
verify: { screen: verify},


},{
  headerMode: 'none'
});

export default MainScreenNavigator;
