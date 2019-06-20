import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,Modal,Image,ListView,TouchableOpacity,AsyncStorage,AppRegistry  } from 'react-native';
import { Container,
  Input, Item,Title,Body,Header,Right,Badge ,
   Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Thumbnail,Card,List,ListItem,Left,Switch,Fab  } from 'native-base';

import FontAwesome, { Icons } from 'react-native-fontawesome';
import { StackNavigator } from 'react-navigation';
import logos from './img/avatar.png';
import approve from './img/approval.png';
import icon from './img/iconn.png';
const ACCESS_TOKEN = 'access_token';
const ACCESS_PIN = 'access_pin';

export default class profile extends Component {
  constructor(props) {
    super(props);
  this.state = {
    modalVisible: false,
     accessToken: "",
      isLoggenIn: "",
      name:null,
      email:null,
      phone:null,
      tokendata:"",
      userpin:null

    
  }
 
 
  }
  componentWillMount() {
    this.getToken();
    
      }


  openModal = () =>{
    this.setState({modalVisible:true});
  }

  closeModal  = () => {
    this.setState({modalVisible:false});
  }


onLogout =() =>{
   Alert.alert(
      'Logout',
      'Are you sure want to logout!!',
      [
        {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => this.deleteToken()},
      ]
    );

  }

getToken = async() => {
    try {
      let data = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(data);
   if(data==null) {
          this.redirect('login');
      } else {

          this.setState({accessToken: data});
          let pin= await AsyncStorage.getItem(ACCESS_PIN);
          this.setState({userpin:pin});
          console.log("pin is:"+ pin);
          this.getuser();
      }     
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('login');
    }
}
  deleteToken = async() => {
    try {
         AsyncStorage.clear();
        this.redirect('login');
    } catch(error) {
        console.log("Something went wrong");
    }
  }
  redirect(routeName){
         this.props.navigation.navigate(routeName);

  }


 
 getuser = () =>{

        const {accessToken} = this.state;
console.log(accessToken)
    fetch('https://wallety.000webhostapp.com/api/getuser', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        token:accessToken
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
        console.log(responseJson)
            this.setState({name: responseJson.name});
            this.setState({email: responseJson.email});
            this.setState({phone: responseJson.mobile})

      })
      .catch((error)=>{
        console.log('sdfsdf')
      });



       
  }
  

   changename = () =>{



    const {name} = this.state;
      const {accessToken} = this.state;
    

         fetch('https://dairydata.000webhostapp.com/api/editprofile', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        name:name,
        token:accessToken
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{


      })
      .catch((error)=>{
        console.error(error);
      });


     this.popupDialog.dismiss(() => {
  console.log('callback - will be called immediately')
});
   
  }

 
  

  render() {


    return (
      <Container style={{backgroundColor: '#F7F7F6'}}>
      <Header style={{backgroundColor: 'white'}}>
          <Left>
           <Thumbnail style={{marginLeft:0}} large source={icon} />
          </Left>
         
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('editprofile')}>
              <Text style={{color: '#5e5e5e',fontSize:20}}><FontAwesome>{Icons.edit}</FontAwesome></Text>
            </Button>
          </Right>
        </Header>
       
 


        <Content style={{marginTop:100,padding:15}}>
        
          <Thumbnail style={{marginLeft:120}} large source={logos} />

         {this.state.name==null?  <Text style={{marginTop:10,color: '#5e5e5e',fontSize:20,textAlign:'center'}}>inVoicer</Text>: <Text style={{marginTop:10,color: '#5e5e5e',fontSize:20,textAlign:'center'}}>{this.state.name}</Text>}




          
           <Card style={{marginTop:40}}>
           <List >
            <ListItem icon>
              <Left>
<Icon ios='ios-mail' active android="md-mail" style={{color: '#ffc033'}} /> 
              </Left>
              <Body>
                    {this.state.email==null?  <Text>Not Updated</Text>: <Text >{this.state.email}</Text>}

              </Body>
              <Right>
               
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
<Icon ios='ios-call' active android="md-call" style={{color: '#ffc033'}} /> 
              </Left>
              <Body>
                    {this.state.phone==null?  <Text>Not Updated</Text>: <Text >{this.state.phone}</Text>}
              </Body>
              
            </ListItem>
            
            <ListItem icon>
              <Left>
<Icon ios='ios-person' active android="md-person" style={{color: '#ffc033'}} /> 
              </Left>
              <Body>
                <Text>ADHAAR Updated <Icon  ios='ios-checkmark-circle'  android="md-checkmark-circle" style={{color: '#ffc033',fontSize:20}} /> 
</Text>
              </Body>
             
            </ListItem>

            <ListItem icon onPress={() => this.props.navigation.navigate('pinset')}>
              <Left>
<Icon ios='ios-key' active android="md-key" style={{color: '#ffc033'}} /> 
              </Left>
              <Body>
                { this.state.userpin==null ? <Text> Set Passcode </Text> : <Text> Change Passcode</Text>} 
              </Body>
             
            </ListItem>



            <ListItem icon onPress={this.onLogout}>
              <Left>
<Icon ios='ios-log-out' active android="md-log-out" style={{color: '#ffc033'}} /> 
              </Left>
              <Body>
                <Text>Log Out</Text>
              </Body>
              
            </ListItem>

           
          </List>
          </Card>
        </Content >
         <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical   onPress={() => this.props.navigation.navigate('home')}>
              <Icon ios='ios-home' android="md-home"  style={{color: '#5e5e5e'}} />
              <Text style={{color: '#5e5e5e'}}>Home</Text>
            </Button>
           
            <Button vertical onPress={() => this.props.navigation.navigate('profile')} >
              <Icon style={{color: '#ffc033'}}  name="person" />
              <Text style={{color: '#ffc033'}}>Profile</Text>
            </Button>
           
          </FooterTab>

        </Footer>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    buttoncont: {
        flex: 1,

    },
    modalContainer: {
    flex:0,
    justifyContent: 'center',
 backgroundColor:'transparent'
  },
  innerContainer: {
    padding:10,
    marginTop:20,
    alignItems: 'center',
 backgroundColor:'transparent'

  },
   
});


