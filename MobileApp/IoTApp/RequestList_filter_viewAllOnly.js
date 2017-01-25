import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Switch,
  Navigator
} from 'react-native';

var RequestRow = require('./RequestRow.js');

export class RequestList extends Component {
  constructor(props){
      super(props);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds, viewAll: false};
  }
     
  componentDidMount(){
      this._getRequestData();
  }
    
  componentWillReceiveProps(){
      this._getRequestData();
  }
    
  _getRequestData(){ //simulates GET data fetch of requests json
     var p1 = new Promise(function(resolve,reject){
        resolve(sampleData);
     });
     p1.then((json) => {
         //json.unshift(headers);
         this.setState({dataSource: ds.cloneWithRows(json)}); //sets the retrieved data as the Request List datasource
         this._filterData();
     })
     .catch((error) => {
         console.log(error);
     });
  }
    
  _filterData(){
    if(!this.state.viewAll){
        var newData = [];
        var curData = [];
        curData = this.state.dataSource._dataBlob.s1;
        for(var i=0; i < curData.length; ++i){
            if(!(curData[i].status == 'S' || curData[i].department == 'Closed'))
                newData.push(curData[i]);
        }
        this.setState({dataSource: this.state.dataSource.cloneWithRows(newData)});
    }
  }    
    
  renderRow(request){ 
      return (
        <RequestRow requestData={request} navigator={this.props.navigator} />
      );
  }
  
  onSwitch(value){
      this.setState({viewAll: value});
      this._getRequestData();
  }

  render() {
    return (
    <View>
        <Text>{"\n\n"}</Text>
        <View style={{flexDirection: 'row'}}>
            <Text>View All{"\t"}</Text>
            <Switch 
                value={this.state.viewAll}
                onValueChange={(value) => this.onSwitch(value)}
            />
        </View>
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