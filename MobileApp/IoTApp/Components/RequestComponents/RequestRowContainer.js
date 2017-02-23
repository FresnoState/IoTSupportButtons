import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Navigator
} from 'react-native';

import RequestRowContent from './RequestRowContent.js';

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
    
    render() {
        var rowColor = (this.props.rowID % 2) ? '#EEE' : '#d8d8d8'; //test colors
        if(this.props.requestData.currstatus.S == "new" || this.props.requestData.currstatus.S == "open"){
            return (
                <TouchableOpacity onPress={this.goToNotes.bind(this)}>
                    <RequestRowContent {...this.props} />
                </TouchableOpacity>
            );
        }
        else{
            return (
                <View>
                    <RequestRowContent {...this.props} />
                </View>
            );
        }
    }
}
