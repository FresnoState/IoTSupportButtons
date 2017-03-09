import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import {Button, Icon} from 'native-base';

import RequestRowContent from './RequestRowContent.js';
import Dimensions from 'Dimensions';

export default class RequestRowContainer extends Component{
    constructor(props){
        super(props);
    }
    
    goToNotes(){ //navigates to notes form, passing the request data
        this.props.navigator.push({
            title: "Notes Form", 
            index: 1,
            passProps: {
                "requestData": this.props.requestData,
                "updateLocalData": this.props.updateLocalData,
                "rowID": this.props.rowID
            }
        });
        
    }
    
    getButton(){
        switch(this.props.requestData.currstatus.S){
            case "new":
                return (
                    <Button style={{padding: 20, position: 'absolute', top: 15, left: Dimensions.get('window').width*0.87, backgroundColor: 'red'}}>
                        <Text style={{fontSize: fontScale*2, color: 'white', fontWeight: 'bold'}}>!</Text>
                    </Button>
                );
                break;
            case "open":
                return (
                    <Button style={{padding: 20, position: 'absolute', top: 15, left: Dimensions.get('window').width*0.87, backgroundColor: 'orange'}}>
                        <Icon style={{fontSize: fontScale*2}} name='ios-arrow-forward' />
                    </Button>
                );
                break;
            case "closed":
                return (
                    <Button style={{padding: 20, position: 'absolute', top: 15, left: Dimensions.get('window').width*0.87, backgroundColor: 'black'}}>
                        <Text style={{fontSize: fontScale*2, color: 'white', fontWeight: 'bold'}}>|</Text>
                    </Button>
                );
                break;
        }
    }
    
    render() {
        var button = this.getButton();
        return (
            <TouchableOpacity style={styles.requestRowContainer} onPress={this.goToNotes.bind(this)}>
                <RequestRowContent {...this.props} />
                {button}
                {/*<TouchableOpacity style={{backgroundColor: 'blue', shadowColor: 'gray', shadowOpacity: 5,borderRadius: 10, padding: 10, position: 'absolute', top: 15, left: Dimensions.get('window').width*0.7}}>
                    <Icon style={{fontSize: fontScale*2, color: 'white'}} name='ios-arrow-forward' />
                </TouchableOpacity>*/}
            </TouchableOpacity>
        );
    }
}
