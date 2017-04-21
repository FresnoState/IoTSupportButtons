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

//import custom scene level components
import RequestList from './Components/RequestComponents/RequestList.js';
import RequestFilters from './Components/RequestComponents/RequestFilters.js';
import NotesForm from './Components/NoteComponents/NotesForm.js';

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
              break;
          case "Notes Form":
              return (
                <NotesForm navigator={navigator} {...route.passProps} />
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

//AppRegistry.registerComponent('IoTApp', () => iotapp);
