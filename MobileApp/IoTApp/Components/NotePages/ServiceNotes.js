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
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource: ds, service_notes: ''};
    }
    
    componentDidMount(){
        this._getNotesData();
    }
    
    componentWillReceiveProps(){
        this._getNotesData();
    }
    
    _getNotesData(){
        var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/notes/';
        url += this.props.requestData.serialNumber.S+'/'+this.props.requestData.timeStamp.S;
        fetch(url)
        .then((response) => {
            return response.json();
        })                             
        .then((json) => {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items)});
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    onAdd(){  //handles the add services notes process
        if(this.state.service_notes == ''){ //checks that the notes are not left blank
            alert("Add notes");
        }
        else{
            this._addNotes();
            this.props.navigator.pop(); //return to Request List
        }
    }
    
    _addNotes(){ 
        var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/notes/';
        url += this.props.requestData.serialNumber.S+'/'+this.props.requestData.timeStamp.S;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'timestamp': new Date().getTime().toString(),
                'notes': encodeURIComponent(this.state.service_notes)
            })
        })
        .then((response) => {
            console.log(response);
        })                             
        .catch((error) => {
            console.log(error);
        });
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
        this._markRequestAsClosed();
        this._addNotes();
        this.props.navigator.pop(); //return to Request List
    }
    
    _markRequestAsClosed(){ 
        var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/request/';
        url += this.props.requestData.serialNumber.S+'/'+this.props.requestData.timeStamp.S;
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'currstatus': "closed"
            })
        })
        .then((response) => {
            console.log(response);
        })                             
        .catch((error) => {
            console.log(error);
        });
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    renderRow(rowData){
        console.log(rowData.notes.S);
        return (
            <Card style={{backgroundColor: '#CCC'}}>
                <Text style={{margin: 10}}>{decodeURIComponent(rowData.notes.S)}</Text>
                <Text>{new Date(Number(rowData.timeStamp.S)).toString()}</Text>
            </Card>
        );
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
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                            />
                        </Row>
                        <Row size={2}>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Input 
                                    placeholder="Add Contact Notes Here" 
                                    style={{backgroundColor: '#EEE', height: Dimensions.get('window').height/4, width: Dimensions.get('window').width, fontSize: fontScale}}
                                    value={this.state.service_notes}
                                    onChangeText={(service_notes) => this.setState({service_notes})}
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