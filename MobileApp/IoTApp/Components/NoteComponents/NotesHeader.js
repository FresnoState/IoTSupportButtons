import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';

import {Col, Row, Grid, Header, Title} from 'native-base';

export default class NotesHeader extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var timestamp = new Date(Number(this.props.requestData.timeStamp.S));
        var options = {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"};
        return(
            <View style={{flex: 1, margin: 5, marginTop: 10, marginBottom: 10}}>
                <Grid>
                    <Row>
                        <Col style={{margin: 5, marginLeft: 10, marginRight: 10}}>
                            <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Location: </Text>
                            <Text style={{fontSize: fontScale}}>{this.props.requestData.location.S}</Text>
                        </Col>
                        <Col style={{margin: 5, marginLeft: 10, marginRight: 10}}>
                            <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Item: </Text>
                            <Text style={{fontSize: fontScale}}>{this.props.requestData.item.S}</Text>
                        </Col>
                        <Col style={{margin: 5, marginLeft: 10, marginRight: 10}}>
                            <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Action: </Text>
                            <Text style={{fontSize: fontScale}}>{this.props.requestData.action.S}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{margin: 5, marginLeft: 10, marginRight: 10}}>
                            <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Time: </Text>
                            <Text style={{fontSize: fontScale}}>{timestamp.toLocaleString("en-us", options)}</Text>
                        </Col>
                        <Col style={{margin: 5, marginLeft: 10, marginRight: 10}}>
                            <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Division: </Text>
                            <Text style={{fontSize: fontScale}}>{this.props.requestData.division.S}</Text>
                        </Col>
                        <Col style={{margin: 5, marginLeft: 10, marginRight: 10}}>
                            {/*<Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Status: </Text>
                            <Text style={{fontSize: fontScale}}>{this.props.requestData.currstatus.S}</Text>*/}
                            <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Description: </Text>
                            <Text style={{fontSize: fontScale}}>{this.props.requestData.description.S}</Text>
                        </Col>
                    </Row>
                    {/*<Row>
                        <Text style={{fontSize: fontScale, fontWeight: 'bold'}}>Description: </Text>
                        <Text style={{fontSize: fontScale}}>{this.props.requestData.description.S}</Text>
                    </Row>*/}
               </Grid>
            </View>
        )
    }
}