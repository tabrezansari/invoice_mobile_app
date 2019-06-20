import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  AsyncStorage
  
} from 'react-native';

import Home from './src/components/home';
import Login from './src/components/login';
import Splash from './src/components/Splash';
import OneSignal from  'react-native-onesignal';

const ACCESS_TOKEN = 'access_token';
const ACCESS_PIN = 'access_pin';
import MainScreenNavigator from './src/components/route';

export default class Index extends Component<{}> {
     componentWillMount() {
        OneSignal.init("b030ea6f-5640-421d-a6e3-8bf9542c05a2");
      
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
    console.log('Device info: ', device);
    }
 constructor(props){
    super(props);
    this.state = {
      timePassed: false,
      accessToken:null,
      accessPin:null
    };
  }
     render() {

 
   
      return (<MainScreenNavigator/>
);
        
      
    
        
      
    }



}



AppRegistry.registerComponent('test', () => Index);
