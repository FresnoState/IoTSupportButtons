import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Col, Row, Grid, Card, CardItem} from 'native-base';

import styles from '../../Styles.js';
import {getNotes} from '../../Modules/Notes.js';

export default class RequestRowContent extends Component{
    constructor(props){
        super(props);
    }
        
    determineUrgency(){ 
        if(this.props.requestData.currstatus.S == "closed"){
            this.setState({rowColor: '#a3a3a3'});
        }
        else{
            var currTime = new Date();
            if(this.props.requestData.currstatus.S == "new"){
                var minutesSinceArrived = (currTime-this.props.requestData.timeStamp.S)/(60000);
                this.setRowColor(minutesSinceArrived);
            }
            else if(this.props.requestData.currstatus.S == "open"){
                callback = (json) => {
                    var notes = json['body-json'].Items;
                    if(notes != null){
                        lastServiceTime = notes[notes.length-1].timeStamp.S;
                        minutesSinceLastServiced = (currTime-lastServiceTime)/(60000); //maybe "cache" this?
                        this.setRowColor(minutesSinceLastServiced);
                    }
                };
                getNotes(this.props.requestData, callback);
            }
        }

    }
    
    setRowColor(minutesDifferent){
        //have intervals be an input array for configuration?
        if(minutesDifferent < 5){
            this.setState({rowColor: '#fdfdfd'});
        }
        else if(minutesDifferent < 10){
            this.setState({rowColor: '#fdfd96'});
        }
        else if(minutesDifferent < 15){
            this.setState({rowColor: '#ffc65f'});
        }
        else{
            this.setState({rowColor: '#ff7b7b'});
        }
    }
    
    render() {
        var rowColor = (this.props.rowID % 2) ? '#EEE' : '#d8d8d8'; //test colors
        var timestamp = new Date(Number(this.props.requestData.timeStamp.S));
        return (
            <Grid>
                <Card style={[styles.requestCard, {backgroundColor:  this.props.requestData.urgencyColor}]}>
                    <Row>
                        <Col size={0.25} style={{padding: 5}}>
                            <Text style={styles.requestCardText}>
                                {timestamp.toLocaleDateString("en-us")}
                            </Text>
                            <Text style={styles.requestCardText}>
                                {timestamp.toLocaleTimeString("en-us", {hour: "2-digit", minute: "2-digit"})}
                            </Text> 
                        </Col>
                        <Col size={0.3} style={{padding: 5}}>
                            <Text style={styles.requestCardText}>
                                {this.props.requestData.location.S}
                            </Text>
                        </Col>
                        <Col size={0.25} style={{padding: 5}}>
                            <Text style={styles.requestCardText}>
                                {this.props.requestData.item.S}
                            </Text>
                        </Col>
                        <Col size={0.2} style={{padding: 5}}>
                        </Col>
                    </Row>
                </Card>
            </Grid>
        );
    }
}
