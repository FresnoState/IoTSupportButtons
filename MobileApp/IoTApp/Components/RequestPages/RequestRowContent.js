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
        return (
            <Grid>
                <Card style={{backgroundColor: rowColor}}>
                    <Row>
                        <Row style={{margin: 5}}>
                            <Col>
                                <Text style={{fontSize: fontScale}}>
                                    {this.props.requestData.location.S+"\n"+this.props.requestData.serialNumber.S}
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
        );
    
    }
}
