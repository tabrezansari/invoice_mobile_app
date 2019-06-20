import React, { Component } from 'react';
import { View,Text,AsyncStorage,AppRegistry } from 'react-native';
import PinView from 'react-native-pin-view';
type Props = {};
const ACCESS_PIN = 'access_pin';
const ACCESS_TOKEN = 'access_token';
import {Spinner } from 'native-base';

export default class Splash extends Component<{}>  {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
        pin:null,
        accessToken:null,
        accessPin:null,
        
    }
  }

  componentWillMount() {
    this.getpin();

  }


onLogout =() =>{
  //hola
  }


 

getpin = async() => {

    try {
      let data = await AsyncStorage.getItem('access_pin');
  

   if(data==null) {
          this.redirect('home');
      } else {

          this.setState({pin: data});
          console.log("splash pin is : "+ this.state.pin)

         
      }     
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('Login');

    }
}


  onComplete(inputtedPin, clear) {
             // this.props.navigation.navigate("pinset");

  if(inputtedPin!==this.state.pin){
  clear();
  }else{
    console.log("pin match");
         this.props.navigation.replace("home");
 }
  }

  redirect(routeName){
         this.props.navigation.navigate(routeName);

  }


  render() {
   if(this.state.pin==null){
     return ( <View style={{flex: 1,backgroundColor: '#ffc033',justifyContent : 'center'}}>
        <Spinner style={{marginTop:100}} color="white"/>
      </View>);

   }else{
      return (
      

      <View style={{flex: 1,backgroundColor: '#ffc033',justifyContent : 'center'}}>
        <PinView
          onComplete={this.onComplete}
           pinLength={4} 
           />
      </View>
    );
   }
  
  
  }
}
