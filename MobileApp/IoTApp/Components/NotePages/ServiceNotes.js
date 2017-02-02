import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ListView,
  View,
  Button,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Card, CardItem, Container, Content, Header, Title, List, ListItem, InputGroup, Input} from 'native-base';
import {Button as Button2} from 'native-base';

import Dimensions from 'Dimensions';

var NotesHeader = require('./NotesHeader.js');

export class ServiceNotes extends Component{
    constructor(props){
        super(props);
        this.state = {service_notes: ''};
    }
    
    onAdd(){  //handles the add services notes process
        if(this.state.service_notes == ''){ //checks that the notes are not left blank
            alert("Add notes");
        }
        else{
            /*var id = { //using room, phone, and time combination as a unique identifier for the request
                "room": this.props.requestData.room,
                "phone": this.props.requestData.phone,
                "time": this.props.requestData.time
            };
            this._addServiceNotes(getRequestIndex(id), encodeURIComponent(this.state.service_notes));*/
            this.props.navigator.pop(); //return to Request List
        }
    }
    
    _addServiceNotes(id, serviceNotes){ //simulates a PUT update to a request object to only update notes
        sampleData[id].service_notes += "%0A"+serviceNotes; //currently separating notes by the URI encoded newline character
        console.log(sampleData[id]);
    }
    
    confirmClose(){
        if(this.state.service_notes == ''){ //checks that notes have been made
            alert("Add notes");
        }
        else{
            Alert.alert( //presents custom alert to check if the user wants to proceed with closing the ticket
                "Confirm Close",  //alert tile
                "Are you sure you want to close this ticket?", //alert message
                [
                    {text: "Yes", onPress: this.onClose.bind(this)}, //button 1, triggers onClose action
                    {text: "No"}  //button 2, causes alert to fade away and user to remain on notes scene w/o any changes made
                ]
            );
        }
    }
    
    onClose(){ //handles the close ticket process
        /*var id = {  //using room, phone, and time combination as a unique identifier for the request
            "room": this.props.requestData.room,
            "phone": this.props.requestData.phone,
            "time": this.props.requestData.time
        }; 
        this._markRequestAsServiced(getRequestIndex(id), encodeURIComponent(this.state.service_notes));*/
        this.props.navigator.pop(); //return to Request List
    }
    
    _markRequestAsServiced(id, serviceNotes){ //simulates a PUT update to a request object to update notes and the status to be closed
        sampleData[id].status = 'S';
        this._addServiceNotes(id, serviceNotes);
        console.log(sampleData[id]);
        alert(Dimensions.get('window').height+" "+Dimensions.get('window').width);
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    render(){
        return (
            <Container>
                <Header>
                    <Title>Service Notes</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>X</Button2>
                </Header>
                <View style={{flex: 1}}>
                    <Grid>
                        <Row size={1}>
                            <NotesHeader {...this.props} /> 
                        </Row>
                        <Row size={2}>
                            <ScrollView>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>this is a note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>another note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>one more note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>one more note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>one more note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>one more note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>one more note</Text>
                                </Card>
                                <Card style={{backgroundColor: '#CCC'}}>
                                    <Text style={{margin: 10}}>one more note</Text>
                                </Card>
                                
                            </ScrollView>
                        </Row>
                        <Row size={2}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Input 
                                    placeholder="Add Contact Notes Here" 
                                    style={{backgroundColor: '#EEE', height: Dimensions.get('window').height/4, width: Dimensions.get('window').width, fontSize: fontScale}}
                                    value={this.state.contact_notes}
                                    onChangeText={(contact_notes) => this.setState({contact_notes})}
                                    multiline
                                    />
                            </View>
                        </Row>
                        <Row size={1}>
                            <Button onPress={this.onAdd.bind(this)} title="Add" />
                            <Button onPress={this.confirmClose.bind(this)} title="Close" />
                        </Row>
                    </Grid>
                </View>
            </Container>
        );
    }
    
    /*render(){
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <NotesHeader title={"Service Notes"} {...this.props} />   
                <View style={{flex: 2, alignItems: 'flex-start'}}>
                    <ScrollView>
                        <Text style={{fontSize: fontScale}}>{"\n"+decodeURIComponent(this.props.requestData.service_notes)}</Text>
                    </ScrollView>
                </View>
                <View style={{flex: 1}}>
                    <TextInput 
                        multiline
                        style={{height: Dimensions.get('window').height/4, width: Dimensions.get('window').width*0.8, fontSize: fontScale}}
                        placeholder="Add Service Notes Here" 
                        value={this.state.service_notes}
                        onChangeText={(service_notes) => this.setState({service_notes})}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button
                        onPress={this.onAdd.bind(this)}
                        title = "Add"
                    />
                    <Text>{"\t"}</Text>
                    <Button
                        onPress={this.confirmClose.bind(this)}
                        title = "Close"
                    />
                </View>
            </View>
        );
    }*/
}

module.exports = ServiceNotes;