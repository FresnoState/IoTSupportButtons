import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  View,
  KeyboardAvoidingView,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Card, Container, Content, Header, Title, Icon, Input, Button} from 'native-base';

import styles from '../../Styles.js';
import NotesHeader from './NotesHeader.js';
import NotesButtons from './NotesButtons.js';
import {getNotes, addNotes} from '../../Modules/Notes.js';
import {updateRequestStatus} from '../../Modules/Request.js';

export default class NotesForm extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {dataSource: ds, notes: ''};
    }
    
    componentDidMount(){
        callback = (json) => {this.setState({dataSource: this.state.dataSource.cloneWithRows(json['body-json'].Items)})};
        getNotes(this.props.requestData, callback);
    }
    
    onAdd(){  //handles the add services notes process
        if(this.state.notes == ''){ //checks that the notes are not left blank
            alert("Please add notes");
        }
        else{
            if(this.props.requestData.currstatus.S == "new"){ //if new request, update status to open
                updateRequestStatus(this.props.requestData, "open");
                this.props.updateLocalData(this.props.rowID, "open");
            }
            addNotes(this.props.requestData, this.state.notes);
            alert("Notes Added");
            this.props.navigator.pop(); //return to Request List
        }
    }
    
    confirmClose(){
        if(this.state.notes == ''){ //checks that notes have been made
            alert("Please add notes to close the request");
        }
        else{
            Alert.alert( //presents custom alert to check if the user wants to proceed with closing the ticket
                "Confirm Close",  //alert tile
                "Are you sure you want to close this request?", //alert message
                [
                    {text: "Yes", onPress: this.onClose.bind(this)}, //button 1, triggers onClose action
                    {text: "No"}  //button 2, causes alert to fade away and user to remain on notes scene w/o any changes made
                ]
            );
        }
    }
    
    onClose(){ //handles the close ticket process
        updateRequestStatus(this.props.requestData, "closed");
        addNotes(this.props.requestData, this.state.notes);
        this.props.updateLocalData(this.props.rowID, "closed");
        alert("Ticket Closed");
        this.props.navigator.pop(); //return to Request List
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    getHeaderColor(){
        switch(this.props.requestData.currstatus.S){
            case "new":
                return '#ea2323';
                break;
            case "open":
                return '#eace00';
                break;
            case "closed": 
                return 'gray';
                break;
        }
    }
    
    renderRow(rowData){
        var timestamp = new Date(Number(rowData.timeStamp.S));
        var options = {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"};
        return (
            <Card style={styles.noteCard}>
                <Text style={styles.noteText}>{decodeURIComponent(rowData.notes.S)}</Text>
                <Text style={styles.noteDateText}>{timestamp.toLocaleString("en-us", options)}</Text>
            </Card>
        );
    }
    
    render(){
        //conditional rendering for open/closed notes, probably will reorganize later
        var buttons = this.props.requestData.currstatus.S == "closed" ? (<View></View>) : (
            <Row size={1}>
                <NotesButtons onAdd={this.onAdd.bind(this)} confirmClose={this.confirmClose.bind(this)} />
            </Row>
        );
        var prevNotesSize = this.props.requestData.currstatus.S == "closed" ? 7 : 3;
        var prevNotes = this.props.requestData.currstatus.S == "new" ? 
                    (<Row size={prevNotesSize} style={styles.noNotesContainer}>
                        <Text>NO NOTES YET</Text>
                    </Row>):
                    (<Row size={prevNotesSize} style={styles.notesContainer}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                        />
                    </Row>);
        var textbox = this.props.requestData.currstatus.S == "closed" ? (<View></View>) : (
            <Row size={2}>
                <View style={styles.notesInputContainer}>
                    <Input 
                        placeholder="Add Notes Here" 
                        style={styles.notesInput}
                        value={this.state.notes}
                        onChangeText={(notes) => this.setState({notes})}
                        multiline
                        />
                </View>
            </Row>
        );
        return (
            <KeyboardAvoidingView behavior='position' style={{flex: 1}} contentContainerStyle={{flex: 1}}>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={styles.headerTitle}>SERVICE NOTES</Title>
                    <Button transparent onPress={this.onCancel.bind(this)}>
                        <Icon style={styles.headerIcon} name='ios-arrow-back' />
                    </Button>
                </Header>
                <Grid>
                    <Row size={1.75}> 
                        <NotesHeader {...this.props} /> 
                    </Row> 
                    <Row size={0.7} style={[styles.statusBanner,  {backgroundColor: this.getHeaderColor()}]}>
                        <Text style={styles.statusBannerText}>
                            {this.props.requestData.currstatus.S.toUpperCase()}
                        </Text>
                    </Row>
                    {prevNotes}
                    {textbox}
                    {buttons}
                </Grid>
            </KeyboardAvoidingView>
            
        );
    }
}