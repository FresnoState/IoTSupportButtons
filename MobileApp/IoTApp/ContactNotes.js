import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Picker,
  Item,
  View,
  Navigator
} from 'react-native';

import Dimensions from 'Dimensions';

var NotesHeader = require('./NotesHeader.js');

export class ContactNotes extends Component {
    constructor (props){
        super(props);
        this.state = {dept: '', contact_notes: ''};
    }
    
    onSubmit(){ //handles the process of marking a ticket with the Contact Made status
        if(this.state.dept == null || this.state.contact_notes == ''){ //checks that both a department is selected and that notes have been made
            alert("Select a department and add notes");
        }
        else{
            var id = { //using room, phone, and time combination as a unique identifier for the request
                "room": this.props.requestData.room,
                "phone": this.props.requestData.phone,
                "time": this.props.requestData.time
            };
            this._markRequestAsContacted(id, this.state.dept, encodeURIComponent(this.state.contact_notes));
            this.props.navigator.pop(); //return to Request List
        }
    }
    
    _markRequestAsContacted = (id, department, contactNotes) => { //simulates a PUT update to a request to add notes and change the status
        var i = getRequestIndex(id);
        sampleData[i].status = 'C';
        sampleData[i].department = department;
        sampleData[i].contact_notes = contactNotes;
        console.log(sampleData[i]);
    }
    
    render(){
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <NotesHeader title={"Contact Notes"} {...this.props} />
                <View style={{flex: 3}}>
                    <TextInput  
                        multiline
                        style={{height: Dimensions.get('window').height/4, width: Dimensions.get('window').width*0.8, fontSize: fontScale}}
                        placeholder="Add Contact Notes Here" 
                        value={this.state.contact_notes}
                        onChangeText={(contact_notes) => this.setState({contact_notes})}
                    />
                    <Picker 
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.dept}
                        onValueChange={(selectedDept) => (this.setState({dept: selectedDept}))} >
                        <Item label="Select Department" value='' />
                        <Item label="CVS" value="CVS" />
                        <Item label="D. Hub" value="D. Hub" />
                        <Item label="Camp. Fac." value="Camp. Fac." />
                        <Item label="Closed" value="Closed" />
                    </Picker>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        onPress={this.onSubmit.bind(this)}
                        title = "Submit"
                    />
                </View>
            </View>
        );
    }
}

module.exports = ContactNotes;