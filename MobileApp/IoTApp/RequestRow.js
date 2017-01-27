import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';

//import { Col, Row, Grid } from "react-native-easy-grid";
import { Col, Row, Grid, Card, CardItem} from 'native-base';

export class RequestRow extends Component{
    constructor(props){
        super(props);
    }
    
    goToNotes(){ //navigates to appropriate note form scene while passing the request Data as props
        switch(this.props.requestData.status){
            case 'N':
                this.props.navigator.push({
                    title: "Contact Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData    //passes requestData json
                    }
                });
                break;
            case 'C':
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
    
    renderStatusColumn(){ //renders the status column of the row
        if(this.props.requestData.status != 'S' && this.props.requestData.department != "Closed" ){ //status is only "touchable" if it is not closed/serviced
            return (
                <TouchableHighlight onPress={this.goToNotes.bind(this)}>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.status}</Text>
                </TouchableHighlight>
            );
        }
        else{
            return (
                <Text style={{fontSize: fontScale}}>{this.props.requestData.status}</Text>
            );
        }
    }
    
    render() {
        var rowColor = (this.props.rowID % 2) ? 'skyblue' : 'lightyellow'; //test colors
        console.log(rowColor);
        return (
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
                                    {this.renderStatusColumn()}
                                </Col>
                            </Row>
                        </Row>
                    </Card>
                </Grid>
            </View>
        );
    }
    
    /*render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontSize: fontScale}}>
                        {this.props.requestData.room+"\t"}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', width: 100}}>
                    <Text style={{fontSize: fontScale}}>
                        {this.props.requestData.phone+"\t\t"}
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: fontScale}}>
                        {this.props.requestData.time+"\t"}
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                {this.renderStatusColumn()}
                </View>
            </View>
        );
    }*/
}

module.exports = RequestRow;