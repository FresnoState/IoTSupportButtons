import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';

import {Col, Row, Grid, Header, Title} from 'native-base';

export class NotesHeader extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View style={{flex: 1}}>
                <Grid>
                    <Row>
                        <Col>
                            <Text style={{fontSize: fontScale}}>Location: {this.props.requestData.location.S}</Text>
                        </Col>
                        <Col>
                            <Text style={{fontSize: fontScale}}>Item: {this.props.requestData.item.S}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{fontSize: fontScale}}>Action: {this.props.requestData.action.S}</Text>
                        </Col>
                        <Col>
                            <Text style={{fontSize: fontScale}}>Time: {new Date(Number(this.props.requestData.timeStamp.S)).toString()}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text style={{fontSize: fontScale}}>Division: {this.props.requestData.division.S}</Text>
                        </Col>
                        <Col>
                            <Text style={{fontSize: fontScale}}>Status: {this.props.requestData.currstatus.S}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Text style={{fontSize: fontScale}}>Description: {this.props.requestData.description.S}</Text>
                    </Row>
                </Grid>
            </View>
        )
    }
}

module.exports = NotesHeader;