import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  RefreshControl,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Card, CardItem, Container, Content, Header, Title, Button, Icon, Footer, FooterTab} from 'native-base';

import RequestRowContainer from './RequestRowContainer.js';
import RequestHeader from './RequestHeader.js';
import getSortFunction from '../../Modules/SortFunctions.js';
import {getRequests} from '../../Modules/Request.js';

export default class RequestList extends Component {
  constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds.cloneWithRows([]), refreshing: false, viewServiceOwner: "All Service Owners", viewStatus: "New/Open", sortCol: 'time'};
  }
    
  componentDidMount(){
      this._getRequestData();
      var reloadInterval = setInterval(this.onRefresh.bind(this), 60000); //for auto reloading data, currently set to every minute
  }
    
  //Commented out for testing local data updates
  /*Re-fetches data when returning to this scene.
    Since the navigator is a prop, an update to the navigator (including a push to leave this page) triggers this function.
    Therefore, we check that we will be on this scene still before re-fetching data.
  */
  /*componentWillReceiveProps(){ 
     var routes = this.props.navigator.getCurrentRoutes();
     if(routes[routes.length-1].title == 'Request List') //only request data if returning (not leaving) this scene
        this._getRequestData(); 
  }*/
    
  _getRequestData(){
      callback = (json) => {
          var sortFunc = getSortFunction(this.state.sortCol);
          this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items.sort(sortFunc))}, () => {
              if(this.state.viewStatus == "New/Open"){
                this._filterOutClosedRequests();
              }
          });
      };
      getRequests(this.state.viewServiceOwner, this.state.viewStatus, callback);
  } 
    
  _filterOutClosedRequests(){
      var unfilteredData = this.state.dataSource._dataBlob.s1;
      var filteredData = [];
      for(var i=0; i<unfilteredData.length; ++i){
          if(unfilteredData[i].currstatus.S == "new" || unfilteredData[i].currstatus.S == "open"){
              filteredData.push(unfilteredData[i]);
          }
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(filteredData)});
  }
    
  onRefresh(){
      this.setState({refreshing: true});
      /*setTimeout(() => {
          this._getRequestData();
          console.log(this.state.dataSource);
          this.setState({refreshing: false}); 
      }, 5000);*/
      this._getRequestData();
      this.setState({refreshing: false}); 
  }
    
  onFilter(serviceOwner, status){
      this.setState({viewServiceOwner: serviceOwner, viewStatus: status}, this._getRequestData);
  }
    
  onSortCol(activeCol){
      //this.setState({sortCol: activeCol});
      //this._getRequestData();
      var sortFunc = getSortFunction(activeCol);
      var unsortedData = this.state.dataSource._dataBlob.s1
      var sortedData = unsortedData.slice();
      sortedData.sort(sortFunc);
      this.setState({sortCol: activeCol, dataSource: this.state.dataSource.cloneWithRows(sortedData)});
  }
    
  renderRow(rowData, sectionID, rowID){ //passed rowID for alternating row color, must be third paramter for render row function
      return (
        <RequestRowContainer requestData={rowData} rowID={rowID} updateLocalData={this.updateLocalData.bind(this)} navigator={this.props.navigator} />
      );
  }
    
  goToFilters(){
      this.props.navigator.push({
         title: "Request Filters",
         index: 1,
         passProps: {
             "viewServiceOwner": this.state.viewServiceOwner,
             "viewStatus": this.state.viewStatus,
             "onFilter": this.onFilter.bind(this)
         }
      });
  }
    
  updateLocalData(rowID, status){
      var oldData = this.state.dataSource._dataBlob.s1;
      var updatedData = oldData.slice();
      updatedData[rowID] = {...oldData[rowID]};
      updatedData[rowID].currstatus.S = status;
      this.setState({dataSource: this.state.dataSource.cloneWithRows(updatedData)});
  }
    
  render() {
      return (
        <Container style={{backgroundColor: '#F5FCFF'}}>
            <Header style={{backgroundColor: '#002C76'}}>
                <Title style={{color: 'white'}}>Service Requests</Title>
                <Button transparent>{''}</Button>
                <Button transparent onPress={this.goToFilters.bind(this)}>
                    <Icon style={{fontSize: fontScale+10, color: 'white'}} name='ios-funnel' />
                </Button>
            </Header>
            <View style={{flex: 1}}>
                <RequestHeader sortCol={this.state.sortCol} onSortCol={this.onSortCol.bind(this)} />
            </View>
            <View style={{flex: 15}}>{/*, margin: 10, marginBottom: 0}}>*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            title="Refreshing..."
                        />
                    }
                />
            </View>
            <Footer>
            </Footer>
        </Container>
      );
  }
  
  
}
