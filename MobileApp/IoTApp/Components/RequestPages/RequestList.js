import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Card, CardItem, Container, Content, Header, Title, Button} from 'native-base';

var RequestRow = require('./RequestRow.js');

export class RequestList extends Component {
  constructor(props){
      super(props);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds, viewServiceOwner: "All Service Owners"};
  }
     
  componentDidMount(){
      this._getRequestData();
  }
    
  componentWillReceiveProps(){
      this._getRequestData(); //when returning to this scene, it updates the request data to update the filter
  }
    
  //REPLACE WITH GET REQUEST
  _getRequestData(){ //simulates GET data fetch of requests json
     var p1 = new Promise(function(resolve,reject){
        resolve(sampleData); //returns json object
     });
     p1.then((json) => {
         this.setState({dataSource: ds.cloneWithRows(json)}); //sets the retrieved data as the Request List datasource
         this._filterData();
     })
     .catch((error) => {
         console.log(error);
     });
  }
    
  _filterData(){
      console.log("FILTERED");
      if(this.state.viewServiceOwner != "All Service Owners"){
          var newData = []; //will store the filtered requests to be displayed
          var curData = this.state.dataSource._dataBlob.s1; //gets a copy of the current data stored in the ListView dataSource
          for(var i=0; i < curData.length; ++i){ //iterates through request data
              if(curData[i].service_owner != this.state.viewServiceOwner){
                    continue; //doesn't meet the selected Service Owner filter criteria so skips to next request
              }
              newData.push(curData[i]); //this point will only be reached if the current request passed all filters, so the current request is added on to the filtered list
          }
          this.setState({dataSource: this.state.dataSource.cloneWithRows(newData)}); //udpates the ListView datasource
          console.log(this.state.dataSource._dataBlob.s1);
      }
  }
    
  onFilterServiceOwner(serviceOwner){
      this.setState({viewServiceOwner: serviceOwner});
  }
    
  renderRow(rowData, sectionID, rowID){ //passed rowID for alternating row color, must be third paramter for render row function
      return (
        <RequestRow requestData={rowData} rowID={rowID} navigator={this.props.navigator} />
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
    
  render() {
      return (
        <Container style={{backgroundColor: '#F5FCFF'}}>
            <Header style={{backgroundColor: 'red'}}>
                <Title style={{color: 'white'}}>Service Requests</Title>
                <Button transparent>{''}</Button>
                <Button onPress={this.goToFilters.bind(this)}>=</Button>
            </Header>
            <View style={{flex: 1}}>{/*Later on will make this separate header component */}
                <Grid>
                    <Card>
                        <Row>
                            <Row style={{margin: 5}}>
                                <Col size={3}>
                                    <Text style={{fontSize: fontScale}}>
                                        Location
                                    </Text>
                                    {/*<Text>v</Text>*/}
                                </Col>
                                <Col size={1}>
                                    <Text>v</Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col size={3}>
                                    <Text style={{fontSize: fontScale}}>
                                        Item
                                    </Text>
                                </Col>
                                <Col size={1}>
                                    <Text>v</Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col size={3}>
                                    <Text style={{fontSize: fontScale}}>
                                        Type
                                    </Text>
                                </Col>
                                <Col size={1}>
                                    <Text>v</Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col size={3}>
                                    <Text style={{fontSize: fontScale}}>
                                        Time
                                    </Text>
                                </Col>
                                <Col size={1}>
                                    <Text>v</Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col size={3}>
                                    <Text style={{fontSize: fontScale}}>
                                        Status
                                    </Text>
                                </Col>
                                <Col size={1}>
                                    <Text>v</Text>
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                </Grid>
            </View>
            <View style={{flex: 10}}>
                <Content>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </Content>
            </View>
        </Container>
      );
  }
  
  /*render() {
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
  }*/
  
  
}

module.exports = RequestList;