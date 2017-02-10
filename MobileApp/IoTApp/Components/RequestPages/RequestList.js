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
import Selection from 'react-native-selection'

import RequestRow from './RequestRow.js';
import RequestHeader from './RequestHeader.js';
import getSortFunction from './SortFunctions.js';

export default class RequestList extends Component {
  constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds, refreshing: false, viewServiceOwner: "All Service Owners", sortCol: 'time'};
  }
    
  componentDidMount(){
      this._getRequestData();
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
     //alert("fetching data");
     var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/dashboard/';
     if(this.state.viewServiceOwner != "All Service Owners"){
         url += this.state.viewServiceOwner;
         //can add check for status filter here
     }
     fetch(url)
        .then((response) => {
            return response.json();
        })                             
        .then((json) => {
            var sortFunc = getSortFunction(this.state.sortCol);
            this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items.sort(sortFunc))});
        })
        .catch((error) => {
            console.log(error);
        });
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
    
  onFilterServiceOwner(serviceOwner){
      this.setState({viewServiceOwner: serviceOwner}, this._getRequestData);
  }
    
  onSortCol(activeCol){
      this.setState({sortCol: activeCol});
      this._getRequestData();
  }
    
  renderRow(rowData, sectionID, rowID){ //passed rowID for alternating row color, must be third paramter for render row function
      return (
        <RequestRow requestData={rowData} rowID={rowID} updateLocalData={this.updateLocalData.bind(this)} navigator={this.props.navigator} />
      );
  }
    
  goToFilters(){
      this.props.navigator.push({
         title: "Request Filters",
         index: 1,
         passProps: {
             "viewServiceOwner": this.state.viewServiceOwner,
             "onFilterServiceOwner": this.onFilterServiceOwner.bind(this)
         }
      });
  }
    
  updateLocalData(rowID, status){
      var oldData = this.state.dataSource._dataBlob.s1;
      var updatedData = oldData.slice();
      updatedData[rowID] = {...oldData[rowID]};
      updatedData[rowID].currstatus.S = status;
      this.setState({dataSource: this.state.dataSource.cloneWithRows(updatedData)});
      //console.log(this.state.dataSource._dataBlob.s1);
  }
    
  render() {
      const options = [
          {
            name: 'All Service Owners',
            value: 'All Service Owners',
            icon: '',
          },
          {
            name: 'DISCOVERe Hub',
            value: 'DISCOVEReHub',
            icon: '',
          },
          {
            name: 'Library IT',
            value: 'LibraryIT',
            icon: '',
          },
        ];
      return (
        <Container style={{backgroundColor: '#F5FCFF'}}>
            <Header style={{backgroundColor: '#002C76'}}>
                <Title style={{color: 'white'}}>Service Requests</Title>
                <Button transparent>{''}</Button>
                <Button transparent onPress={this.goToFilters.bind(this)}>
                    <Icon style={{fontSize: fontScale+10, color: 'white'}} name='md-funnel' />
                </Button>
                {/*<Button>
                    <Selection 
                        title="Service Owner" 
                        options={options} 
                        onSelection={(e) => console.log(e)}
                        style={{
                          body: null,
                          option: null,
                        }}
                        iconSize={20}
                        iconColor="#eee"
                      />
                </Button>*/}
            </Header>
            <View style={{flex: 1}}>
                <RequestHeader sortCol={this.state.sortCol} onSortCol={this.onSortCol.bind(this)} />
            </View>
            <View style={{flex: 10}}>
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
