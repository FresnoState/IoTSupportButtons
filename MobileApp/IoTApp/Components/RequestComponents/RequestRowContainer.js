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
                    <TouchableOpacity onPress={this.goToNotes.bind(this)} style={{flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, position: 'absolute', top: 5, right: 15, shadowColor: '#333333', shadowOpacity: 1, backgroundColor: 'red'}}>
                        <Icon style={{fontSize: fontScale*1.8, color: 'white', marginRight: 10}} name='ios-radio-button-off' />
                        <Icon style={{fontSize: fontScale*1.8, color: 'white'}} name='ios-arrow-forward' />
                        {/*<Text style={{fontSize: fontScale*1.5, color: 'white', fontWeight: 'bold'}}>!</Text>*/}
                    </TouchableOpacity>
                );
                break;
            case "open":
                return (
                    <TouchableOpacity onPress={this.goToNotes.bind(this)} style={{flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, position: 'absolute', top: 5, right: 15, shadowColor: '#333333', shadowOpacity: 1, backgroundColor: '#ffc400'}}>
                        <Icon style={{fontSize: fontScale*1.8, color: 'white', marginRight: 10}} name='ios-contrast' />
                        <Icon style={{fontSize: fontScale*1.8, color: 'white'}} name='ios-arrow-forward' />
                    </TouchableOpacity>
                );
                break;
            case "closed":
                return (
                    <TouchableOpacity onPress={this.goToNotes.bind(this)} style={{flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, position: 'absolute', top: 5, right: 15, shadowColor: '#333333', shadowOpacity: 1, backgroundColor: 'gray'}}>
                        <Icon style={{fontSize: fontScale*1.8, color: 'white', marginRight: 10}} name='ios-radio-button-on' />
                        <Icon style={{fontSize: fontScale*1.8, color: 'white'}} name='ios-arrow-forward' />
                        {/*<Text style={{fontSize: fontScale*1.5, color: 'white', fontWeight: 'bold'}}>|</Text>*/}
                    </TouchableOpacity>
                );
                break;
        }
    }
    
    render() {
        var button = this.getButton();
        return (
            <View style={styles.requestRowContainer} >
                <RequestRowContent {...this.props} />
                {button}
                {/*<TouchableOpacity style={{backgroundColor: 'blue', shadowColor: 'gray', shadowOpacity: 1,borderRadius: 10, margin: 10, padding: 10, position: 'absolute', top: 5, right: 5, flexDirection: 'row'}}>
                    <Text style={{color: 'white', marginRight: 10, fontSize: 10}}>Open</Text>
                    <Icon style={{fontSize: fontScale*1.5, color: 'white', marginRight: 10}} name='ios-contrast' />
                    <Icon style={{fontSize: fontScale*1.5, color: 'white'}} name='ios-arrow-forward' />
                </TouchableOpacity>*/}
            </View>
        );
    }
}
