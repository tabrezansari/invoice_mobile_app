import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
import {Spinner } from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';
 const ACCESS_PIN = 'access_pin';

export default class pinset extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      code:null,
      code2:null,
      label:'ENTER YOUR PASSCODE',
      ishide:false

    };
  }
  redirect(routeName,accessToken){   
    this.props.navigation.navigate(routeName,{accessToken:accessToken});
  }

  

  _onFinishCheckingCode2(isValid,codes) {
    this.setState({label:'RE-ENTER YOUR PASSCODE'});
    if(this.state.code==null){
          this.setState({code:codes});
              console.log('code1'+codes);

    }else{
      this.setState({code2:codes});
      console.log('code2'+codes);
      if(this.state.code==codes){
        this.setState({ishide:true});
              this.setpin();

      }
      else{
   this.setState({label:'ENTER YOUR PASSCODE'});
    this.setState({code:null,code2:null});

         Alert.alert(
        'PASSCODE',
        'Not Match!',
        [{text: 'OK'}],
        { cancelable: false }
      );
      }
    }


  }
setuserpin = async (code) => {
      try {
    await AsyncStorage.setItem(ACCESS_PIN,code);
     this.redirect('home');

  } catch (error) {
    // Error saving data
  }
}


  setpin(){

     const {code} = this.state;
    
         fetch('https://wallety.000webhostapp.com/api/setpin', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        token:'OTY4NjkxMDQzOA==',
        pin:code
      })      
    })
    .then((response) => response.json())
      .then((responseJson) =>{

        console.log(responseJson);
        this.setuserpin(code);
      })
      .catch((error)=>{
        console.error(error);
      });   
  }
  
  render() {


    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          {this.state.ishide ? null: <View style={styles.titleWrapper}>
            <Text style={styles.title}>Protect Your Purchase</Text>
          </View> }
          {this.state.ishide ? null : <View style={styles.inputWrapper3} >
            <Text style={styles.inputLabel3}>{this.state.label}</Text>
            <CodeInput
              ref="codeInputRef2"
              keyboardType="numeric"
              codeLength={4}
              className={'border-circle'}
              compareWithCode='0000'
              autoFocus={true}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(isValid, codes) => this._onFinishCheckingCode2(isValid, codes)}
            />
          </View>  }

          {this.state.ishide ? <Spinner style={{marginTop:100}} color="white"/> : null}
       
  
         
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
    backgroundColor: '#009C92'
  },
  inputWrapper2: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#E0F8F1'
  },
  inputWrapper3: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#ffc033'
  },
  inputLabel1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800'
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