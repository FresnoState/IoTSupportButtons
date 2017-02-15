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

import {Col, Row, Grid, Container,  Header, Title, Input, Icon} from 'native-base';
import {Button as Button2} from 'native-base';

import Dimensions from 'Dimensions';

import NotesHeader from './NotesHeader.js';
import {addNotes} from '../../Modules/Notes.js';
import {updateRequestStatus} from '../../Modules/Request.js';

export default class ContactNotes extends Component {
    constructor (props){
        super(props);
        this.state = {division: '', contact_notes: ''};
    }
    
    onSubmit(){ //handles the process of marking a ticket with the Contact Made status
        if(this.state.division == null || this.state.contact_notes == ''){ //checks that both a department is selected and that notes have been made
            alert("Select a department and add notes");
        }
        else{
            updateRequestStatus(this.props.requestData, "open");
            addNotes(this.props.requestData, this.state.contact_notes);
            this.props.updateLocalData(this.props.rowID, "open");
            alert("Notes Added");
            this.props.navigator.pop(); //return to Request List
        }
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    render(){
        return (
            <Container>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Contact Notes</Title>
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
