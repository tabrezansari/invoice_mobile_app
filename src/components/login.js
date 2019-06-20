import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,Image,AppRegistry,TouchableOpacity,AsyncStorage } from 'react-native';
import { Container,
  Input,Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Card,Left,Spinner } from 'native-base';

import logo from './img/iconn.png';
const ACCESS_TOKEN = 'access_token';
export default class lgoin extends Component {
  constructor()
  {
    super();
 
    this.state = { hidePassword: true,
    mob_email:'',
    password:'',
    error:'',
    isclick: 0, 


     }
  }
   redirect(routeName,accessToken){
   
    this.props.navigation.navigate(routeName,{accessToken:accessToken});
  }

//   storeToken(responseData){
    
//      try {
//    AsyncStorage.setItem(ACCESS_TOKEN, responseData);
//   console.log('susee');
// } catch (error) {
//   // Error saving data
// }
//   }
 
  // managePasswordVisibility = () =>
  // {
  //   this.setState({ hidePassword: !this.state.hidePassword });
  // }

 userLogin = () =>{
    
    const {mob_email} = this.state;
     this.setState({isclick:1});

    console.log(mob_email);
    if(mob_email!="" ){
         fetch('https://wallety.000webhostapp.com/api/register', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        mobile: mob_email,
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson)
           this.props.navigation.navigate('verify',{mobile:mob_email});


      })
      .catch((error)=>{
        console.log('error');
        // this.setState({error: error});
      });
     
    }else{
this.setState({error: 'Enter Mobile Number'});   
 }

  // try {
  //     let response = fetch('http://10.0.2.2/indibus/login.php', {
  //                             method: 'POST',
  //                             headers: {
  //                               'Accept': 'application/json',
  //                               'Content-Type': 'application/json',
  //                             },
  //                             body: JSON.stringify({
  //                               mob_email: mob_email,
  //                              password:password,
  //                             })
  //                           });
  //     let res = response.Text();
  //     if (response.status >= 200 && response.status < 300) {
  //         //Handle success
  //         let accessToken = res;
  //         console.log(accessToken);
  //         //On success we will store the access_token in the AsyncStorage
  //         this.storeToken(accessToken);
  //         Alert.alert(accessToken);
  //         // this.redirect('profile');
  //     } else {
  //         //Handle error
  //         let error = res;
  //         throw error;
  //     }
  //   } catch(error) {
  //       this.setState({error: error});
  //       console.log("error " + error);
  //   }
  }
  render() {

    return (
      <Container style={{backgroundColor: '#F7F7F6'}}>
        <Header style={{backgroundColor: 'white'}} >
          <Body>
            <Title style={{color:'#5e5e5e'}}>Login or Register</Title>
          </Body>
        
        </Header>
        <Content style={{marginTop:100}}>
       <Image style={styles.logo} source={logo}      
       />


         <Card>
            <CardItem>
              <Body>
                 <Item>
          <Icon active ios='ios-person' android="md-person" style={{fontSize: 30, color: '#ffc033'}}/>
            <Input placeholder='Mobile Number' onChangeText= {mob_email => this.setState({mob_email})}/>
          </Item>

          <Text style={styles.error}>
            {this.state.error==""?null: <Icon ios='ios-close-circle-outline' style={{fontSize:12,color:'#ffc033'}} android="md-close-circle"/> }   {this.state.error}
        </Text>

       


           <Button onPress={this.userLogin}  block danger iconLeft style={{marginTop: 20, backgroundColor: '#ffc033'}} >
          {this.state.isclick==0 ? <Text>VERIFY</Text>: <Spinner color="white"/> }  
          </Button>
              </Body>

            </CardItem>
           
          </Card>


           

          
        </Content >
         

        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    buttoncont: {
      flex:1,
        padding:10,
        

    },
     logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:100
       
    },

     error: {
    color: '#C62828',
    paddingTop: 10,
    fontSize:12,
    textAlign:'center'

  },
  success: {
    color: 'green',
    paddingTop: 10
  },
     visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
     btnImage:
  {
   width:20,
   height:20
  }
});
AppRegistry.registerComponent('login', () => login);


