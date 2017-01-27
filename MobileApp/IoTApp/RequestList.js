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
      this.state = {dataSource: ds.cloneWithRows([])};
  }
     
  componentDidMount(){
      this._getRequestData();
  }
    
  //REPLACE WITH GET REQUEST
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
    
  renderRow(request, sectionID, rowID){ //passed rowID for alternating row color, must be third paramter for render row function
      return (
        <RequestRow requestData={request} rowID={rowID} navigator={this.props.navigator} />
      );
  }
    
  render() {
      return (
        <Container style={{backgroundColor: '#F5FCFF'}}>
            <Header style={{backgroundColor: 'red'}}>
                <Title style={{color: 'white'}}>Service Requests</Title>
                <Button transparent>{''}</Button>
                <Button>=</Button>
            </Header>
            <View style={{flex: 1}}>  {/*Later on will make this separate header component */}
                <Grid>
                    <Card>
                        <Row>
                            <Row style={{margin: 5}}>
                                <Col size={3}>
                                    <Text style={{fontSize: fontScale}}>
                                        Location
                                    </Text>
                                    <Text>v</Text>
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