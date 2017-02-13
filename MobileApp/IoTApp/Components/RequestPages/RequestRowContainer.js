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
    
    goToNotes(){ //navigates to appropriate note form scene while passing the request Data as props
        switch(this.props.requestData.currstatus.S){
            case 'new':
                this.props.navigator.push({
                    title: "Contact Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData, //passes requestData json
                        "updateLocalData": this.props.updateLocalData,
                        "rowID": this.props.rowID
                    }
                });
                break;
            case 'open':
                this.props.navigator.push({
                    title: "Service Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData,
                        "updateLocalData": this.props.updateLocalData,
                        "rowID": this.props.rowID
                    }
                });
                break;
        }
    }
    
    render() {
        var rowColor = (this.props.rowID % 2) ? '#EEE' : '#d8d8d8'; //test colors
        if(this.props.requestData.currstatus.S == "new" || this.props.requestData.currstatus.S == "open"){
            return (
                <TouchableOpacity onPress={this.goToNotes.bind(this)}>
                    <RequestRowContent {...this.props} />
                    {/*<Text>Touch Test</Text>*/}
                </TouchableOpacity>
            );
        }
        else{
            return (
                <View>
                    <RequestRowContent {...this.props} />
                    {/*<Text>Non-Touch Test</Text>*/}
                </View>
            );
        }
    }
}
