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

global.headers = {
    "room": 'ID',
    "phone": 'Service Owner',
    "time": 'Time',
    "status": 'Status'
};

global.sampleData = [   
    {
        "service_owner": 'DISCOVERe Hub',
        "location": 'Libray Room 201',
        "item": 'RM201',
        "type": 'P4HL',
        "time": '1/24/17 3:47pm',
        "status": 'N',
        "notes": []
    },
    {
        "service_owner": 'Library IT',
        "location": '1st Floor',
        "item": 'WRK#3',
        "type": 'P2RP',
        "time": '1/23/17 3:46pm',
        "status": 'C',
        "notes": []
    },
    {
        "service_owner": 'Library IT',
        "location": 'Library 2nd Floor',
        "item": 'WRK#10',
        "type": 'P2RP',
        "time": '1/22/17 3:45pm',
        "status": 'S',
        "notes": []
    }
    
];

global.getRequestIndex = (id) => {  //helper function for update simulating functions
    for(var i=0; i < sampleData.length; ++i){
        if(sampleData[i].room == id.room && sampleData[i].phone == id.phone && sampleData[i].time == id.time){
            return i;
        }
    }
};

////This can be in a styles.js file, like a global style sheet
//alert(Dimensions.get('window').height+" "+Dimensions.get('window').width);
var width = Dimensions.get('window').width;
global.fontScale = 12;
/*if(width > 900){
    fontScale = 36;
}
else if(width > 500){
    fontScale = 24;
}
else if(width > 300){
    fontScale = 18;
}
else{
    fontScale = 16;
};*/


//import custom scene level components
var RequestList = require('./RequestList.js');
//var RequestList = require('./RequestList_filter_viewAllOnly.js');
//var RequestList = require('./RequestList_filter.js');
var ContactNotes = require('./ContactNotes.js');
var ServiceNotes = require('./ServiceNotes');


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
