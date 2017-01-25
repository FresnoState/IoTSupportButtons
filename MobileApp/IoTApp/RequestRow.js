import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';

//import { Col, Row, Grid } from "react-native-easy-grid";

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
    
    /*render() {
        return (
            <View>
            <Grid>
                <Row>
                    <Col size={1}>
                        <Text style={{fontSize: fontScale}}>
                            {this.props.requestData.room}
                        </Text>
                    </Col>
                    <Col size={2}>
                        <Text style={{fontSize: fontScale}}>
                            {this.props.requestData.phone}
                        </Text>
                    </Col>
                    <Col size={2}>
                        <Text style={{fontSize: fontScale}}>
                            {this.props.requestData.time}
                        </Text>
                    </Col>
                    <Col size={2}>
                    {this.renderStatusColumn()}
                    </Col>
                </Row>
            </Grid>
            </View>
        );
    }*/
    
    render() {
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
    }
}

module.exports = RequestRow;