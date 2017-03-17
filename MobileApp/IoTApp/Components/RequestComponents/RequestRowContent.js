import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Col, Row, Grid, Card, CardItem} from 'native-base';

export default class RequestRowContent extends Component{
    constructor(props){
        super(props);
    }
    
    render() {
        var rowColor = (this.props.rowID % 2) ? '#EEE' : '#d8d8d8'; //test colors
        var timestamp = new Date(Number(this.props.requestData.timeStamp.S));
        return (
            <Grid>
                <Card style={{backgroundColor: rowColor, padding: 10, borderRadius: 5}}>
                    <Row >
                        <Col style={{padding: 5}}>
                            <Text style={{fontSize: fontScale}}>
                                {timestamp.toLocaleDateString("en-us")}
                            </Text>
                            <Text style={{fontSize: fontScale}}>
                                {timestamp.toLocaleTimeString("en-us", {hour: "2-digit", minute: "2-digit"})}
                            </Text> 
                        </Col>
                        <Col style={{padding: 5}}>
                            <Text style={{fontSize: fontScale}}>
                                {this.props.requestData.location.S}
                            </Text>
                        </Col>
                        <Col style={{padding: 5}}>
                            <Text style={{fontSize: fontScale}}>
                                {this.props.requestData.item.S}
                            </Text>
                        </Col>
                        <Col size={0.5} style={{padding: 5}}>
                            {/*<Text style={{fontSize: fontScale}}>
                                {this.props.requestData.currstatus.S}
                            </Text>*/}
                        </Col>
                    </Row>
                </Card>
            </Grid>
        );
    }
}
