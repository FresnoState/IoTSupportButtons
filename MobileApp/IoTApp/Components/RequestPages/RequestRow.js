import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import { Col, Row, Grid, Card, CardItem} from 'native-base';

export class RequestRow extends Component{
    constructor(props){
        super(props);
    }
    
    goToNotes(){ //navigates to appropriate note form scene while passing the request Data as props
        switch(this.props.requestData.currstatus.S){
            case 'new':
                this.props.navigator.push({
                    title: "Contact Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData //passes requestData json
                    }
                });
                break;
            case 'open':
                this.props.navigator.push({
                    title: "Service Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData    
                    }
                });
                break;
        }
        
    }
    
    render() {
        var rowColor = (this.props.rowID % 2) ? '#CCC' : '#AAA'; //test colors
        /*var rowCard = (
            <View>
                <Grid>
                    <Card style={{backgroundColor: rowColor}}>
                        <Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.location}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.item}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.type}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.time}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.status}
                                    </Text>
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                </Grid>
            </View>
        );
        if(this.props.requestData.status.S != 'S'){
            console.log(rowCard);
            return(
                <TouchableHighlight onPress={this.goToNotes.bind(this)}>
                    {rowCard}
                </TouchableHighlight>
            );
        }
        else{
            return rowCard;
        }
    */
    
    return (
        <TouchableOpacity onPress={this.goToNotes.bind(this)}>
            <View>
                <Grid>
                    <Card style={{backgroundColor: rowColor}}>
                        <Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.location.S}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.item.S}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.action.S}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {new Date(Number(this.props.requestData.timeStamp.S)).toString()}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{margin: 5}}>
                                <Col>
                                    <Text style={{fontSize: fontScale}}>
                                        {this.props.requestData.currstatus.S}
                                    </Text>
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                </Grid>
            </View>
        </TouchableOpacity>
     );
   } 
}

module.exports = RequestRow;