import React, { Component } from 'react';
import { Image,AppRegistry,Dimensions,Platform,StyleSheet ,AsyncStorage,RefreshControl,ScrollView} from 'react-native';
import { Container,Title,Footer,List,ListItem,FooterTab,Button,Right,Item,Picker, Header, View,Content,DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,TouchableOpacity } from 'native-base';
import icon from './img/iconn.png';
import store from './img/store.png';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

import { CardViewWithIcon } from "react-native-simple-card-view";
type Props = {};
const ACCESS_TOKEN = 'access_token';

export default class home extends Component {
 constructor(props) {
    super(props)
      this.state = {
      modalVisible: false,
      accessToken: "",
      isLoggenIn: "",
      amount:'',
      acbal:0,
      data:[],
      cartc:0,
      error:'',
      refreshing: false,
      month:null,year:null,
      datatest:1
  }
}

 componentWillMount() {
    this.getToken();
  }


onLogout =() =>{
    this.deleteToken();
  }


getToken = async() => {

    try {
      let data = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(data);
   if(data==null) {
          this.redirect('login');
      } else {

          this.setState({accessToken: data});
          
    this.getinvoices();          
      }     
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('Login');

    }
}

  deleteToken = async() => {
    try {
         AsyncStorage.clear();
        this.redirect('Login');
    } catch(error) {
        console.log("Something went wrong");
    }
  }


  redirect(routeName){
   this.props.navigation.navigate(routeName);

  }










  onValueChange5(value: string) {
    this.setState({
      month: value
    });
    console.log(value)
  }

   onValueChange6(value: string) {
    this.setState({
      year: value
    });
    console.log(value)
  }


  filterinvoices = () =>{
   const {month} = this.state;
   const {year} = this.state;
   const {accessToken} =this.state;
     this.setState({datatest:1});

   this.setState({modalVisible:false});

        fetch('http://wallety.000webhostapp.com/api/getfilteredinvoices',{
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        token:accessToken,
        year:year,
        month:month
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
   this.setState({month:null,year:null});


   this.setState( { data: responseJson });
   if(this.state.data.length==0){
    this.setState({datatest:0});
   }
   console.log(this.state.data)

     this.popupDialog.dismiss(() => {
});
      })
      .catch((error)=>{
        console.error(error);
      });
   
  }



  getinvoices = () =>{
const {accessToken} =this.state;
  this.setState({datatest:1});

    if (this.state.data){


        fetch('http://wallety.000webhostapp.com/api/getinvoices',{
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
   this.setState( { data: responseJson });
console.log(responseJson)
      })
      .catch((error)=>{
        console.error(error);
      });
    }
    else
    {

    }
  }

 refreshdata = () => {
    this.setState({refreshing: true});
this.getinvoices();

      this.setState({refreshing: false});
  }
  hola() {
    console.log("hola")
  }




  render() {

    var ini = this;


  let isi = this.state.data.map((data, index) =>  {
        return (

          <List key={index} style={{backgroundColor:'white'}}>
             <ListItem avatar  onPress={() => this.props.navigation.navigate('invoice',{invoiceid:data.id})} >
              <Left>
                <Thumbnail source={store} />
              </Left>
              <Body>
                <Text>{data.stores.profile.name}</Text>
                <Text note>{data.date}</Text>
              </Body>
              <Right>
                <Text style={{fontSize:20,color:'#5e5e5e'}}>
          <FontAwesome>{Icons.inr}</FontAwesome> {data.bill}
                </Text>
              </Right>

            </ListItem>

            </List>
            

        )
    });


  
    return (
      
      <Container >
      

  <Header style={{backgroundColor: 'white'}}>
          <Left>
           <Thumbnail style={{marginLeft:0}} large source={icon} />
          </Left>
         
          <Right>
            <Button transparent onPress={() => {
      this.popupDialog.show();
    }}>
              <Text style={{color: '#5e5e5e'}}>Filter  <FontAwesome>{Icons.filter}</FontAwesome></Text>
            </Button>
          </Right>
        </Header>
          
          <Content refreshControl={<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this.refreshdata()} />}>
          {isi}

           {this.state.datatest==0?
              <View style={{
                  flex: 1, 
                  alignItems: 'center',
                  justifyContent: 'center', 
                  marginTop:100
              }}>
                  <Text style={{color:'grey',fontSize:18}}>
                      No Purchase Found!
                  </Text>
              </View>
              :null}
        </Content>
           

          
         <Footer >
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button vertical   onPress={() => this.props.navigation.navigate('home')}>
              <Icon ios='ios-home' android="md-home"  style={{color: '#ffc033'}} />
              <Text style={{color: '#ffc033'}}>Home</Text>
            </Button>
           
            <Button vertical onPress={() => this.props.navigation.navigate('profile')} >
              <Icon style={{color: '#5e5e5e'}}  name="person" />
              <Text style={{color: '#5e5e5e'}}>Profile</Text>
            </Button>
           
          </FooterTab>

        </Footer>

        <PopupDialog
    dialogTitle={<DialogTitle title="Filter" />}
    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
  >
    <Content>
          
            <Picker
              mode="dropdown"
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.month}
              onValueChange={this.onValueChange5.bind(this)}
            >
              <Item label="Filter by Month" value="key0" />
              <Item label="January" value="1" />
              <Item label="February" value="2" />
              <Item label="March" value="3" />
              <Item label="April" value="4" />
              <Item label="May" value="5" />
              <Item label="June" value="6" />
              <Item label="July" value="7" />
              <Item label="August" value="8" />
              <Item label="September" value="9" />
              <Item label="October" value="10" />
              <Item label="November" value="11" />
              <Item label="December" value="12" />
            </Picker>

            <Picker
              mode="dropdown"
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.year}
              onValueChange={this.onValueChange6.bind(this)}
            >
              <Item label="Filter by Year" value="key0" />
                <Item label="2018" value="2018" />
                <Item label="2019" value="2019" />
                <Item label="2020" value="2020" />
                <Item label="2021" value="2021" />
                <Item label="2022" value="2022" />
                <Item label="2023" value="2023" />
                <Item label="2024" value="2024" />

           
            </Picker>
     
           
          <Button onPress={this.filterinvoices} block info iconLeft style={{marginTop: 20, backgroundColor: '#00add9',width:250,marginLeft:60}} >
          <Text>Filter</Text>
               </Button>
        </Content>
  </PopupDialog>

      </Container>
    );
  }
}




const styles = StyleSheet.create({
  container: {flex: 2, alignItems: 'center',backgroundColor: '#F5FCFF',paddingTop: 25,},});



