import React, { Component } from 'react';
import { StyleSheet,image,View,Alert,TouchableOpacity,AppRegistry,AsyncStorage } from 'react-native';
import { Container,Input, Item,Title,Body,Header,Right,Badge , Content, Footer, FooterTab, Button, Icon,
    Text,CardItem,Card,Thumbnail,Left,
    List,ListItem,Label,Radio,Form,Picker} from 'native-base';
import { DatePickerDialog } from 'react-native-datepicker-dialog';

import moment from 'moment';
const ACCESS_TOKEN = 'access_token';
import AwesomeAlert from 'react-native-awesome-alerts';

import { StackNavigator } from 'react-navigation';
import logos from './img/avatar.png';
import ImagePicker from 'react-native-image-picker';
var FileUpload = require('NativeModules').FileUpload;

export default class editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
     selected5: "key2"
    };
     this.state = {
        accessToken: "",
        isLoggenIn: "",
        DateText: '',
        showAlert: false,
        alerttype:null,
        altitle:'',
        almsg:'',
        name:null,
        email:null,
        phone:null,
        dob:null,
        gender:null,
        tokendata:"",
        DateText: '',
        DateHolder: null,      
      }
  }


/*start of showalert */
  showAlert = () => {
      this.setState({
        showAlert: true
      });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

/*end of showalert */

/* Fucntion called the getToken() method to check weather user is aunthenticated or not*/
 componentWillMount() {
    this.getToken();
    
  }

// fucntion to get logged out!!
onLogout =() =>{
    this.deleteToken();
  }

/* this method will excuted first to check user authentication*/
 getToken = async() => {
  try {
      let data = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(data);
    if(data==null) {
          this.redirect('login');
      } 
    else {

          this.setState({accessToken: data});
          this.getuser();
      }     
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('login');
    }
 }

 //this method will invoked by the logout fuction to clear storage!!
  deleteToken = async() => {
    try {
         AsyncStorage.clear();
        this.redirect('login');
    } catch(error) {
        console.log("Something went wrong");
    }
  }

  //redirect to any page using routes
  redirect(routeName){
         this.props.navigation.navigate(routeName);

  }

/* Function to push updated user data to the database using REST API*/
 updateProfile = () =>{
    const {name} = this.state;
    const {selected5} = this.state;
    const {email} = this.state;
    const {DateText} = this.state;
    const {accessToken} = this.state;

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(email) === false)
   {
    Alert.alert(
    'Email',
    'Enter Valid Email Address',
   );
   }
  else
  {

   // this.setState({alerttype:1});
   //      this.showAlert();


    if(name!="" && DateText!="" && selected5!=""){
    
   const data = new FormData();
   if(this.state.isselect==0){
    data.append('data', {
          uri: this.state.sourceAsString,
          type: 'image/jpeg',
          name: this.state.fileName,
        });
    }
      

      console.log(name)
      console.log(selected5)
      console.log(email)
      console.log(DateText)
      
         fetch('https://wallety.000webhostapp.com/api/editprofile', {
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        token:accessToken,
        name:name,
        gender:selected5,
        dob:DateText,
        email:email,

      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
        // alert(responseJson);
       
        this.redirect('profile');
      })
      .catch((error)=>{
        console.error(error);
      });
     
    }else{
     Alert.alert('Fill All The Details');
    }


  }

  }




 /* Function to get User Data to display when this page is opened */
 getuser = () =>{
  console.log("statred")

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
        this.setState({phone: responseJson.mobile});
        this.setState({DateText: responseJson.dob});
        this.setState({selected5: responseJson.gender})
      })
      .catch((error)=>{
        console.log('sdfsdf')
      });       
  }
  
/*Function to pick date using Library call DatePicker*/
   DatePickerMainFunctionCall = () => {
 
    let DateHolder = this.state.DateHolder;
 
    if(!DateHolder || DateHolder == null){
 
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
 
    //To open the dialog
      this.refs.DatePickerDialog.open({
   
        date: DateHolder,
   
      });
 
  }

//Methode will invoked when date is picked!!!
onDatePickedFunction = (date) => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }

  onValueChange5(value: string) {
    this.setState({
      selected5: value
    });
  }

/*Start of rendring the element in the componenet*/
  render() {
        const {showAlert} = this.state;

    const progalert=<AwesomeAlert
          show={showAlert}
          showProgress={true}
           title= "Updating.."
          closeOnHardwareBackPress={false}
          progressSize='small'
          progressColor='gray'
        />;

     const alertmsg=<AwesomeAlert
          show={showAlert}
          showProgress={false}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Okay"
          confirmButtonColor="#DD6B55"
           title={this.state.altitle}
          message= {this.state.almsg}
         
         
          
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />;


  return (
      <Container style={{backgroundColor: '#F7F7F6'}}>
         <Header style={{backgroundColor: 'white'}} >
        <Left>
       <Icon ios='ios-arrow-back'   android="md-arrow-back" style={{color: '#5e5e5e'}} />
        </Left>
           <Body style={{marginLeft:10}}>
            <Title style={{color:'#5e5e5e'}}>Edit Profile</Title>
          </Body>
       
        </Header>
        <Content style={{marginTop:30}}>
           <Thumbnail style={{marginLeft:140}} large source={logos} />
         
         <Card style={{marginTop:10}}>
            <CardItem>
              <Body>
                 <Item>
          <Icon active ios='ios-person' android="md-person" style={{fontSize: 30, color: '#ffc033'}}/>
            <Input placeholder={this.state.name!=null ? this.state.name : 'Full Name ' }  onChangeText= {name => this.setState({name})}/>
          </Item>


          <Item style={{marginTop:10}}>
          <Icon active ios='ios-mail' android="md-mail" style={{fontSize: 30, color: '#ffc033'}}/>
            <Input placeholder={this.state.email!=null ? this.state.email : 'Email ' } onChangeText= {email => this.setState({email})} />
          </Item>

         

          <Item fixedLabel style={{marginTop:20}} onPress={this.DatePickerMainFunctionCall.bind(this)}>
          <Icon active ios='ios-calendar'  android="md-calendar" style={{fontSize: 30, color: '#ffc033',marginBottom:5}}/>

          {this.state.DateText == null? <Label style={{marginBottom:5}}>  Date of Birth</Label>: <Label style={{marginBottom:5}}>{this.state.DateText}</Label>}
            </Item>
           <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />        
              </Body>
            </CardItem>

            <Form>
             
            <Picker
              mode="dropdown"
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selected5}
              onValueChange={this.onValueChange5.bind(this)}
            >
              <Item label=" Select Your Gender" value="key0" />
              <Item label="Male" value="1" />
              <Item label="Female" value="2" />
              <Item label="Other" value="3" />
            </Picker>
          </Form>
            <Button   onPress={this.updateProfile}  block danger iconLeft style={{marginTop: 5, backgroundColor: '#ffc033'}} >
            <Text>Save Profile</Text>
          </Button>
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
 
 
  datePickerBox:{
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
 
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
 
  },
   
});

