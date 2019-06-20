import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,AppRegistry,AsyncStorage,ScrollView } from 'react-native';
import { Container,
  Input, Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Card,Label,Left,Spinner } from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';

import { StackNavigator } from 'react-navigation';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
 const ACCESS_TOKEN = 'access_token';

import moment from 'moment';
export default class verify extends Component {
  constructor(props) {
    super(props)
       this.state = { 
      DateText: '',
      isclick: 0, 
      DateHolder: null,
      otp:'',
       mobile:this.props.navigation.state.params.mobile      
    }
  }

 redirect(routeName,accessToken){   
    this.props.navigation.navigate(routeName,{accessToken:accessToken});
  }


   DatePickerMainFunctionCall = () => {
 
    let DateHolder = this.state.DateHolder;
 
    if(!DateHolder || DateHolder == null){
 
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
 
    this.refs.DatePickerDialog.open({
 
      date: DateHolder,
 
    });
 
  }
  onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }


   _verifypin(code) {
    this.setState({isclick:1});
    const {mobile} = this.state;
    const {otp} = this.state;
    
         fetch('https://wallety.000webhostapp.com/api/verify', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        mobile: mobile,
        otp:code
      })      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson);
  AsyncStorage.setItem(ACCESS_TOKEN,responseJson);
 this.redirect('home');
      })
      .catch((error)=>{
        console.error(error);
      });   
   

  }
  
  render() {


   return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Mobile Verification</Text>
          </View>
          
          <View style={styles.inputWrapper1}>
            <Text style={styles.inputLabel1}>We have sent 5 digit OTP to your mobile +91{this.props.navigation.state.params.mobile}. Enter Code Below</Text>
            <CodeInput
              ref="codeInputRef1"
              secureTextEntry
              className={'border-b'}
              space={5}
              size={30}
              inputPosition='left'
              onFulfill={(code) => this._verifypin(code)}
            />



            <Text style={styles.inputLabel11}>Resend OTP</Text>

           {this.state.isclick==0 ? <Text></Text>: <Spinner style={{marginTop:30}} color="white"/> }  


          </View>
  
         
        </ScrollView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc033'
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    paddingVertical: 30
  },
  wrapper: {
    marginTop: 30
  },
  inputWrapper1: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffc033'
  },
  inputWrapper2: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffc033'
  },
  inputWrapper3: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#2F0B3A'
  },
  inputLabel1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800'
  },
  inputLabel11: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    marginTop:30
  },
  inputLabel2: {
    color: '#31B404',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  },
  inputLabel3: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center'
  }
});


