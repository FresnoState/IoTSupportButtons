import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Picker,
  Item,
  View,
  Navigator,
  Button
} from 'react-native';

import {Col, Row, Grid, Container,  Header, Title, Input} from 'native-base';
import {Button as Button2} from 'native-base';

import Dimensions from 'Dimensions';

var NotesHeader = require('./NotesHeader.js');

export class ContactNotes extends Component {
    constructor (props){
        super(props);
        this.state = {division: '', contact_notes: ''};
    }
    
    onSubmit(){ //handles the process of marking a ticket with the Contact Made status
        if(this.state.division == null || this.state.contact_notes == ''){ //checks that both a department is selected and that notes have been made
            alert("Select a department and add notes");
        }
        else{
            this._markRequestAsOpen();
            this._addNotes();
            this.props.navigator.pop(); //return to Request List
        }
    }
    
    _markRequestAsOpen() { //simulates a PUT update to a request to add notes and change the status
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
                'currstatus': "open"
            })
        })
        .then((response) => {
            console.log(response);
        })                             
        .catch((error) => {
            console.log(error);
        });
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
                'notes': encodeURIComponent(this.state.contact_notes)
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
    
    render(){
        return (
            <Container>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Contact Notes</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>x</Button2>
                </Header>
                <View style={{flex: 1}}>
                    <Grid>
                        <Row size={2}>
                            <NotesHeader {...this.props} />
                        </Row>
                        <Row size={3}>
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
                        {/*<Row size={2}>
                            <View style={{flex: 1}}>
                            <Picker 
                                itemStyle={{fontSize: fontScale}}
                                selectedValue={this.state.division}
                                onValueChange={(selectedDiv) => (this.setState({division: selectedDiv}))} >
                                <Item label="Select Division" value='' />
                                <Item label="CVS" value="CVS" />
                                <Item label="D. Hub" value="DISCOVEReHub" />
                                <Item label="Camp. Fac." value="CampFac" />
                                <Item label="Closed" value="Closed" />
                            </Picker>
                            </View>
                        </Row>*/}
                        <Row size={1}>
                            <Button onPress={this.onSubmit.bind(this)} title="Submit" />
                        </Row>
                    </Grid>
                </View>
            </Container>
        );
    }
}

module.exports = ContactNotes;