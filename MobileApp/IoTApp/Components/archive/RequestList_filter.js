import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Switch,
  Picker,
  Item,
  Navigator
} from 'react-native';

var RequestRow = require('./RequestRow.js');
//var RequestRow = require('./RequestRow_expandable.js');
var RequestFilters = require('./RequestFilters.js');

export class RequestList extends Component {
  constructor(props){
      super(props);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds, viewStage: "Open", viewDept: "All"};
  }
     
  componentDidMount(){
      this._getRequestData(); //performs the initial retrieval of the request data
  }
    
  componentWillReceiveProps(){
      this._getRequestData(); //when returning to this scene, it updates the request data to update the filter
  }
    
  _getRequestData(){ //simulates GET data fetch of requests json
     var p1 = new Promise(function(resolve,reject){
        resolve(sampleData); //currently returns the global example json
     });
     p1.then((json) => {
         //json.unshift(headers);
         this.setState({dataSource: ds.cloneWithRows(json)}); //sets the retrieved data as the Request List datasource
         this._filterData(); //filters the data based on the current state filter values
     })
     .catch((error) => {
         console.log(error);
     });
  }
    
  //checks state filter variables to filter the ListView display
  _filterData(){ 
      if(this.state.viewDept != "All" || this.state.viewStage != "All"){ //checks if any filtering is needed
          var newData = []; //stores the filtered requests to be displayed
          var curData = this.state.dataSource._dataBlob.s1; //gets a copy of the current data stored in the ListView dataSource
          for(var i=0; i < curData.length; ++i){ //iterates through request data
              if(this.state.viewDept != "All"){ //checks whether to filter by department
                if(curData[i].department != this.state.viewDept)
                    continue; //doesn't meet the selected department filter criteria so skips to next request
              }
              if(this.state.viewStage != "All"){ //checks whether to filter by stage
                  if(this.state.viewStage == "Open"){
                      if(curData[i].status == 'S' || curData[i].department == 'Closed')
                          continue; //doesn't meet the "Open" stage filter criteria so skips to next request
                  }
                  else {
                      if(!(curData[i].status == 'S' || curData[i].department == 'Closed'))
                          continue; //doesn't meet the "Closed" stage filter criteria so skips to next request
                  }
              }
              newData.push(curData[i]); //this point will only be reached if the current request passed all filters, so the current request is added on to the filtered list
          }
          this.setState({dataSource: this.state.dataSource.cloneWithRows(newData)}); //udpates the ListView datasource to hold only the filtered data
      }
  }    
    
  renderRow(request){ 
      return (
        <RequestRow requestData={request} navigator={this.props.navigator} />
      );
  }
    
  onFilterStage(stage){ 
      this.setState({viewStage: stage}); //updates the state stage filter value
      this._getRequestData(); //calling this function updates the data source and triggers the filter function
  }
    
  onFilterDept(dept){
      this.setState({viewDept: dept}); //updates the state department filter value
      this._getRequestData(); //calling this function updates the data source and triggers the filter function
  }
    
  

  render() {
    return (
        <View >
            <Text>{"\n\n"}</Text>
            <RequestFilters
                viewStage = {this.state.viewStage}
                onFilterStage = {this.onFilterStage.bind(this)}
                viewDept = {this.state.viewDept}
                onFilterDept = {this.onFilterDept.bind(this)}
            />
            <View style={{marginTop: 100}}>
                <Text style={{fontSize: fontScale}}>
                    {"\n\n"+headers.room+"\t"+headers.phone+"\t"+headers.time+"\t"+headers.status+"\n"} 
                </Text>
            </View>
            <View >
                <ListView
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                />
            </View>
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
});

module.exports = RequestList;