import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  RefreshControl,
  Navigator,
  Image
} from 'react-native';

import {Col, Row, Grid, Card, CardItem, Container, Content, Header, Title, Button, Icon, Footer, FooterTab} from 'native-base';

import styles from '../../Styles.js';
import RequestRowContainer from './RequestRowContainer.js';
import RequestHeader from './RequestHeader.js';
import getSortFunction from '../../Modules/SortFunctions.js';
import {getRequests} from '../../Modules/Request.js';
import {getNotes} from '../../Modules/Notes.js';
import {refreshMilliseconds} from '../../IntervalTimeConfigurations.js'; //configurable time interval for autorefresh

export default class RequestList extends Component {
  constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds.cloneWithRows([]), refreshing: false, viewServiceOwner: "All Service Owners", viewStatus: "New/Open", sortCol: 'time', headerText: "All Service Owners", headerImage: "header1"};
  }
    
  componentDidMount(){
      this._getRequestData();
      var reloadInterval = setInterval(this.onRefresh.bind(this), refreshMilliseconds); 
      //var determineUrgencyInterval = setInterval(this.updateRowColors.bind(this), 60000); //for if different time intervals are needed
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
          var requests = json['body-json'].Items.sort(sortFunc);
          for(i=0; i<requests.length; ++i){
              this.setRowColor(requests[i]);
          }
          this.setState({dataSource: this.state.dataSource.cloneWithRows(requests)}, () => {
              if(this.state.viewStatus == "New/Open"){
                this._filterOutClosedRequests();
              }
          });
      };
      getRequests(this.state.viewServiceOwner, this.state.viewStatus, callback);
  }
    
  /*_getRequestData(){
      callback = (json) => {
          var sortFunc = getSortFunction(this.state.sortCol);
          this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items.sort(sortFunc))}, () => {
              this.updateRowColors(); 
              if(this.state.viewStatus == "New/Open"){
                this._filterOutClosedRequests();
              }
          });
      };
      getRequests(this.state.viewServiceOwner, this.state.viewStatus, callback);
  }*/
    
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
      setTimeout(() => {
          this._getRequestData();
          this.setState({refreshing: false}); 
      }, 5000);
  }
    
  onFilter(serviceOwner, status){
      function getHeaderText(serviceOwner){
        switch(serviceOwner){
            case "All Service Owners":
                return "All Service Owners";
                break;
            case "DISCOVEReHub":
                return "DISCOVERe Hub";
                break;
            case "P4P":
                return "Pay for Print";
                break;
            default:
                return "All Service Owners";
        }
      }
    
      function getHeaderImage(serviceOwner){
        switch(serviceOwner){
            case "All Service Owners":
                return "header1";
                break;
            case "DISCOVEReHub":
                return "header3";
                break;
            case "P4P":
                return "header2";
                break;
            default:
                return "header1";
        }
      } 
           
      this.setState({viewServiceOwner: serviceOwner, viewStatus: status, headerText: getHeaderText(serviceOwner), headerImage: getHeaderImage(serviceOwner)}, this._getRequestData);
  }
    
  onSortCol(activeCol){
      var sortFunc = getSortFunction(activeCol);
      var unsortedData = this.state.dataSource._dataBlob.s1;
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
      if((this.state.viewStatus == "New/Open" && status == "closed") || (this.state.viewStatus != "All Statuses" && this.state.viewStatus != "New/Open" && this.state.viewStatus != status)){ //if new status not in the current filtered view
          delete oldData[rowID];
          var updatedData = oldData.slice();
          this.setState({dataSource: this.state.dataSource.cloneWithRows(updatedData)});
      }
      else{
          var updatedData = oldData.slice();
          updatedData[rowID] = {...oldData[rowID]};
          updatedData[rowID].currstatus.S = status;
          this.setRowColor(updatedData[rowID]);
          this.setState({dataSource: this.state.dataSource.cloneWithRows(updatedData)});
      }
  }

  setRowColor(request){
    function getTimeDiffColor(minutesDifferent){
        //have intervals be an input array for configuration?
        if(minutesDifferent < 10){
            return '#fdfdfd';
        }
        else if(minutesDifferent < 20){
            return '#fdfd96';
        }
        else if(minutesDifferent < 30){
            return '#ffc65f';
        }
        else{
            return '#ff7b7b';
        }
    }
  
    if(request.currstatus.S == "closed"){
        //return '#a3a3a3';
        request["urgencyColor"] =  '#a3a3a3';
    }
    else{
        var currTime = new Date();
        //if(request.currstatus.S == "new"){
            var minutesSinceArrived = (currTime-request.timeStamp.S)/(60000);
            //return getTimeDiffColor(minutesSinceArrived);
            request["urgencyColor"] = getTimeDiffColor(minutesSinceArrived);
        /*}
        else if(request.currstatus.S == "open"){
            callback = (json) => {
                var notes = json['body-json'].Items;
                if(notes != null){
                    lastServiceTime = notes[notes.length-1].timeStamp.S;
                    minutesSinceLastServiced = (currTime-lastServiceTime)/(60000); //maybe "cache" this?
                    request["urgencyColor"] = getTimeDiffColor(minutesSinceLastServiced);
                }
            };
            getNotes(request, callback);
        }*/
    }
      
  }

  updateRowColors(){
      var oldRows = this.state.dataSource._dataBlob.s1;
      var newRows = oldRows.slice();
      for(i=0; i<oldRows.length; i++){
          newRows[i] = {...oldRows[i]};
          //newRows[i]["urgencyColor"] = this.getRowColor(oldRows[i].currstatus.S);
          this.setRowColor(newRows[i]);
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(newRows)});
  }

  scrollToTop(){
      this.listView.scrollTo(0);
  }
    
  render() {
      //var image = require(this.state.headerImage);
      return (
        <Container style={{backgroundColor: '#F5FCFF'}}>
            <Header style={{backgroundColor: '#002C76'}}>
                <Title style={styles.headerTitle}>SERVICE REQUESTS</Title>
                <Button transparent>{''}</Button>
                <Button transparent onPress={this.goToFilters.bind(this)}>
                    <Icon style={styles.headerIcon} name='md-options' />{/*'ios-funnel'*/}
                </Button>
            </Header>
            <Image
                source={{uri: this.state.headerImage}}
                style={styles.backgroundImage}
            >
                <View style={styles.backgroundImageBar}>
                    <Text style={styles.backgroundImageText}>
                        {this.state.headerText}
                    </Text>
                </View>
            </Image>
            <View style={styles.requestListHeaderContainer}>
                <RequestHeader sortCol={this.state.sortCol} onSortCol={this.onSortCol.bind(this)} />
            </View>
            <View style={styles.requestListContainer}>{/*, margin: 10, marginBottom: 0}}>*/}
                <ListView
                    ref={(ListView) => {this.listView = ListView;}}
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
            <Footer style={{justifyContent: 'flex-end'}}>
                <FooterTab>
                </FooterTab>
                <FooterTab>
                </FooterTab>
                <FooterTab>
                    {/*<Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>
                    <Button transparent>{''}</Button>*/}
                    <Button onPress={this.scrollToTop.bind(this)}>
                        <Icon style={styles.headerIcon} name='ios-arrow-dropup' />
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
      );
  }
  
  
}
