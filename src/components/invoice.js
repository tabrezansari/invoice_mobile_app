import React, { Component } from 'react';
import { Image,AppRegistry,Dimensions,Platform,StyleSheet,Divider,Linking,Share,AsyncStorage  } from 'react-native';
import { Container,Title,Footer,FooterTab,ListItem,List,Switch,Button,Right, Header, View,Content,DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import icon from './img/iconn.png';
import store from './img/store.png';
import Barcode from 'react-native-barcode-builder';
import logo from './img/logo.jpg';
const ACCESS_TOKEN = 'access_token';

import { CardViewWithIcon } from "react-native-simple-card-view";
type Props = {};


export default class invoice extends Component {
 constructor(props) {
    super(props);
    this.state = ({
        github: 0,
        invoiceid:this.props.navigation.state.params.invoiceid,
              accessToken: "",
        data:[],
           dataitems:[],
           gstprice:null,
           subtotal:null

  
  

      }
    )
  }
getdata = () =>{
//todo
}

componentWillMount() {
    this.getToken();

   console.log("invoiceid:"+this.state.invoiceid);

      }


  getToken = async() => {

    try {
      let data = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log(data);
   if(data==null) {
          this.redirect('login');
      } else {

          this.setState({accessToken: data});
          
    this.getinvoicedata();          
      }     
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('Login');

    }
}

 getinvoicedata = () =>{
const {accessToken} =this.state;
const {invoiceid} =this.state;

        fetch('http://wallety.000webhostapp.com/api/getinvoicedetail',{
      method: 'post',
      header:{
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        token:accessToken,
        invoiceid:invoiceid
      })
      
    })
    .then((response) => response.json())
      .then((responseJson) =>{
   this.setState( { dataitems: responseJson.items});
// console.log(this.state.dataitems)
console.log(responseJson)
   this.setState( { data: responseJson });
      var gst=parseInt(this.state.data.bill)/100*2.5;
      this.setState({gstprice:gst.toFixed(2)});
      
      var bill=parseInt(this.state.data.bill);
      var total=gst+bill;


      this.setState({subtotal:total.toFixed(2)});


      })
      .catch((error)=>{
        console.error(error);
      });
  
  }

  redirect(routeName){
   this.props.navigation.navigate(routeName);

  }


 onShare = async() => {
  let pwd = "";
  while(!pwd || pwd.length < 200)
  {
    pwd += Math.random().toString(36).slice(-22);
  }
  
  let re=pwd.substring(0, 200);

    try {
      const result = await Share.share({
        message:
          'http://wallety.000webhostapp.com/api/getinvoicedata'+re+'/'+this.state.invoiceid,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }


generatebill =()=>{
  const {invoiceid} =this.state;
   console.log("invoice id is:"+invoiceid);
   let pwd = "";
  while(!pwd || pwd.length < 200)
  {
    pwd += Math.random().toString(36).slice(-22);
  }
  
  let re=pwd.substring(0, 200);
  let url="http://wallety.000webhostapp.com/api/getinvoicedata"+re+"/"+this.state.invoiceid;
  Linking.openURL(url);

}

  render() {
   var ini = this;

const {dataitems}=this.state;
  let isi = dataitems.map((items,index) =>   {
      return (         

          <List key={index}>
            <ListItem thumbnail>
              <Left>
                <Text style={{color:'#5e5e5e'}}>{items.qtywt} - </Text>
              </Left>
              <Body>
              <Text style={{color:'#5e5e5e'}}>{items.item_name}</Text>

              </Body>
              <Right>
                  <Text style={{color:'#5e5e5e'}}>{items.price}</Text>
              </Right>
            </ListItem>
            </List>
            

        )
    });
    return (
      <Container>
   <Header style={{backgroundColor: 'white'}}>
          <Left>
           <Thumbnail style={{marginLeft:0}} large source={icon} />
          </Left>
         
          <Right>
            <Button transparent onPress={this.onShare}>
              <Icon ios='ios-share' android="md-share"  style={{color: '#ffc033'}} />
            </Button>
          </Right>
        </Header>
          
          <Content style={{marginTop:0}}>
           <Card style={{backgroundColor:'white'}}>
          <Text></Text>
          {this.state.data!="" ?
      <Image
          style={{width:'100%', height: 80,flex: 1,alignSelf: 'center',}}
          source={{uri: 'http://wallety.000webhostapp.com/uploads/logos/'+this.state.data.stores.profile.logo}}
        />
        :null}


    <Text style={{marginTop:10,marginLeft:20,color:'#5e5e5e'}}>Invoice No: {this.state.data.invoice_no}</Text>
    <Text style={{marginLeft:20,color:'#5e5e5e'}}>Date: {this.state.data.date}</Text>

      
    <Card>
           <List>
            <ListItem thumbnail>
              <Left>
                <Text style={{color:'#ffc033'}}>Qty/Wt</Text>
              </Left>
              <Body>
              <Text style={{color:'#ffc033'}}>Items</Text>

              </Body>
              <Right>
                  <Text style={{color:'#ffc033'}}>Price</Text>
              </Right>
            </ListItem>
            </List>
            </Card>

         
            {isi}


<CardItem header bordered>
             <Left>
                 <Text></Text>
              
            </Left>
            <Body>
              <Text style={{fontSize:13,color:'#5e5e5e'}}>GST</Text>
            </Body>
            <Right>
                 <Text style={{fontSize:13,color:'#5e5e5e'}}>{this.state.gstprice} (2.5%)</Text>
            </Right>
             </CardItem>
               


            <CardItem header bordered>
             <Left>
                 <Text></Text>
              
            </Left>
            <Body>
              <Text style={{fontSize:17,color:'#5e5e5e'}}>Total</Text>
            </Body>
            <Right>
                 <Text style={{fontSize:17,color:'#5e5e5e'}}>INR {this.state.subtotal}</Text>
            </Right>
             </CardItem>
             
            
        

           

           

                  

           

           
       

         
          </Card>


          <Button onPress={this.generatebill}  block danger iconLeft style={{marginBottom:0, backgroundColor: '#ffc033'}} >
            <Text style={{color:'white'}}>Generate inVoice <Icon ios='ios-print' android="md-print" style={{color:'white'}} />
</Text>
          </Button>
         
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 2, alignItems: 'center',backgroundColor: '#F5FCFF',paddingTop: 25,},});



