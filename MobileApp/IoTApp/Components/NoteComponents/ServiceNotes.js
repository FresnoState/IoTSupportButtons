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

import {Col, Row, Grid, Card, Container, Content, Header, Title, Icon, Input} from 'native-base';
import {Button as Button2} from 'native-base';
import Dimensions from 'Dimensions';

import NotesHeader from './NotesHeader.js';
import {getNotes, addNotes} from '../../Modules/Notes.js';
import {updateRequestStatus} from '../../Modules/Request.js';

export default class ServiceNotes extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource: ds, service_notes: ''};
    }
    
    componentDidMount(){
        callback = (json) => {this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items)})};
        getNotes(this.props.requestData, callback);
    }
    
    onAdd(){  //handles the add services notes process
        if(this.state.service_notes == ''){ //checks that the notes are not left blank
            alert("Add notes");
        }
        else{
            addNotes(this.props.requestData, this.state.service_notes);
            alert("Notes Added");
            this.props.navigator.pop(); //return to Request List
        }
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
        updateRequestStatus(this.props.requestData, "closed");
        addNotes(this.props.requestData, this.state.service_notes);
        this.props.updateLocalData(this.props.rowID, "closed");
        alert("Ticket Closed");
        this.props.navigator.pop(); //return to Request List
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    renderRow(rowData){
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
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Service Notes</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>
                        <Icon style={{fontSize: fontScale+10, color: 'white'}} name='ios-close' />
                    </Button2>
                </Header>
                <View style={{flex: 1}}>
                    <Grid>
                        <Row size={2}>
                            <NotesHeader {...this.props} /> 
                        </Row>
                        <Row size={3}>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                            />
                        </Row>
                        <Row size={3}>
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
}