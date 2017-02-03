import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Card, CardItem, Container, Content, Header, Title, Button, Icon, Footer, FooterTab} from 'native-base';

var RequestRow = require('./RequestRow.js');

export class RequestList extends Component {
  constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {dataSource: ds, viewServiceOwner: "All Service Owners"};
  }
    
  componentDidMount(){
      this._getRequestData();
  }
    
  /*Re-fetches data when returning to this scene.
    Since the navigator is a prop, an update to the navigator (including a push to leave this page) triggers this function.
    Therefore, we check that we will be on this scene still before re-fetching data.
  */
  componentWillReceiveProps(){ 
     var routes = this.props.navigator.getCurrentRoutes();
     if(routes[routes.length-1].title == 'Request List') //only request data if returning (not leaving) this scene
        this._getRequestData(); 
  }
    
  _getRequestData(){
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
            var sortFunc = this.sortByTime;
            this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items.sort(sortFunc))});
        })
        .catch((error) => {
            console.log(error);
        });
  } 
    
  sortByTime(a, b) {
      var time1 = a.timeStamp.S;
      var time2 = b.timeStamp.S;
      if(time1 < time2){
          return 1;
      }
      if(time1 > time2){
          return -1;
      }
      return 0;
  };
    
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
            <Header style={{backgroundColor: '#002C76'}}>
                <Title style={{color: 'white'}}>Service Requests</Title>
                <Button transparent>{''}</Button>
                <Button danger onPress={this.goToFilters.bind(this)}><Icon style={{fontSize: fontScale+10, color: 'white'}} name='md-funnel' /></Button>
            </Header>
            <View style={{flex: 1, backgroundColor: '#FFF', marginTop: 10}}>{/*Later on will make this separate header component */}
                <Grid>
                        <Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        Location
                                    </Text>
                                    {/*<Text>v</Text>*/}
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        Item
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        Action
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        Time
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        Status
                                    </Text>
                                </Col>
                            </Row>
                        </Row>
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
            <Footer>
            </Footer>
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