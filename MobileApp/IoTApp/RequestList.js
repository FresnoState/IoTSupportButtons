import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Navigator
} from 'react-native';

var RequestRow = require('./RequestRow.js');

export class RequestList extends Component {
  constructor(props){
      super(props);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds.cloneWithRows([])};
  }
     
  componentDidMount(){
      this._getRequestData();
  }
    
  _getRequestData(){ //simulates GET data fetch of requests json
     var p1 = new Promise(function(resolve,reject){
        resolve(sampleData); //returns json object
     });
     p1.then((json) => {
         this.setState({dataSource: ds.cloneWithRows(json)}); //sets the retrieved data as the Request List datasource
     })
     .catch((error) => {
         console.log(error);
     });
  }
    
  renderRow(request){ 
      return (
        <RequestRow requestData={request} navigator={this.props.navigator} />
      );
  }
  
  render() {
    return (
    <View>
        <Text>{"\n\n"}</Text>
        <Text>
           {"\n\n"+headers.room+"\t"+headers.phone+"\t"+headers.time+"\t"+headers.status+"\n"} 
        </Text>
        <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
        />
        
      </View>
    );
  }
}

module.exports = RequestList;