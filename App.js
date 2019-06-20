/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  AsyncStorage,
TouchableOpacity,
} from 'react-native';




export default class App extends Component<Props> {



saveDate = () => {
  Alert.alert('done');
let user='tabrez';
AsyncStorage.clear();

}

displayData = async() => {
  Alert.alert('ready');
try{
let user = await AsyncStorage.getItem('user');
alert(user);
}catch(error)
{
  alert(error);
}
}


  render() {
    return (
      <View style={styles.container}>
       
        <TouchableOpacity onPress={this.saveDate}>
        <Text style={styles.instructions}>
          Click To Save
        </Text>
        </TouchableOpacity >

         <TouchableOpacity onPress={this.displayData}>
        <Text style={styles.instructions}>
          Click To Display
        </Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
