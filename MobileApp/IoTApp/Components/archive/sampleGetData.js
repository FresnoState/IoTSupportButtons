/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';


export default class iotapp extends Component {
  constructor(props){
      super(props);
      this.state = {data: ''};
  }
    
  getData(){
      /*fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => {
                console.log(response);
                return response.json();
            })                             ///simulating from this stage on from the response
            .then((json) => {
                //console.log(json.movies);
                this.handleResponse(json.movies);
            })
            .catch((error) => {
                console.log(error);
            });*/
      
    /*  var json = {
                  "title": "The Basics - Networking",
                  "description": "Your app fetched this from a remote endpoint!",
                  "movies": [
                    { "title": "Star Wars", "releaseYear": "1977"},
                    { "title": "Back to the Future", "releaseYear": "1985"},
                    { "title": "The Matrix", "releaseYear": "1999"},
                    { "title": "Inception", "releaseYear": "2010"},
                    { "title": "Interstellar", "releaseYear": "2014"}
                  ]
     };
      
     //simulates what fetch returns after first callback that converts response to json object
     var p1 = new Promise(function(resolve,reject){
         resolve(json); //returns json object
     });
      
     p1.then((json) => {
         console.log(json.movies);
         this.handleResponse(json.movies);
     })
     .catch((error) => {
         console.log(error);
     });
      */
      
    fetch('https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/dashboard/')
            .then((response) => {
                console.log(response);
                return response.json();
            })                             
            .then((json) => {
                console.log(json.Items);
            })
            .catch((error) => {
                console.log(error);
            });
  } 
    
  handleResponse(movies){
    text = "";
    for(var x in movies){
        text += movies[x].title;
        text += " ";
        text += movies[x].releaseYear;
        text += "\n";
    }
    this.setState({data: text});
  }
    
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.getData.bind(this)}>
            <Text style={styles.welcome}>
              Get Data
            </Text>
        </TouchableHighlight>
        <Text>
          {this.state.data}
        </Text>
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

AppRegistry.registerComponent('IoTApp', () => iotapp);
