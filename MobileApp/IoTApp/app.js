import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Navigator
} from 'react-native';

import Dimensions from 'Dimensions';

////This can be in a styles.js file, like a global style sheet
//alert(Dimensions.get('window').height+" "+Dimensions.get('window').width);
var width = Dimensions.get('window').width;
global.fontScale; // = 12;
if(width > 900){
    fontScale = 18;
}
else if(width > 500){
    fontScale = 14;
}
else if(width > 300){
    fontScale = 12;
}
else{
    fontScale = 10;
};


//import custom scene level components
import RequestList from './Components/RequestPages/RequestList.js';
import RequestFilters from './Components/RequestPages/RequestFilters.js';
import ContactNotes from './Components/NotePages/ContactNotes.js';
import ServiceNotes from './Components/NotePages/ServiceNotes.js';


export default class iotapp extends Component {
  constructor(props){
      super(props);
  }
    
  renderScene(route, navigator){ //route structure
      switch(route.title){
          case "Request List":
              return (
                <RequestList navigator={navigator}/>
              );
              break;
          case "Request Filters":
              return (
                  <RequestFilters navigator={navigator} {...route.passProps} />
              );
          case "Contact Notes":
              return (
                <ContactNotes navigator={navigator} {...route.passProps} />
              );
              break;
          case "Service Notes":
              return (
                <ServiceNotes navigator={navigator} {...route.passProps} />
              );
              break;
      }
  }
    
  render() {
    return (
      <Navigator
        initialRoute = {{title: 'Request List', index: 0}} //Request List is first scene
        renderScene = {this.renderScene.bind(this)}
        configureScene = {(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
      />
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

//AppRegistry.registerComponent('IoTApp', () => iotapp);
