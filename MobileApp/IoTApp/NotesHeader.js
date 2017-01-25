import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';

export class NotesHeader extends Component{
    constructor(props){
        super(props);
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    render(){
        return(
            <View style={{flex: 1, alignItems: 'center'}}>
                <Text>{"\n"}</Text>
                <Button
                    onPress={this.onCancel.bind(this)}
                    title = "x"
                />
                <Text style={{fontSize: fontScale}}>{"\n"}{this.props.title}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.room+"\t"}</Text>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.phone+"\t"}</Text>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.time+"\t"}</Text>
                </View>
            </View>
        )
    }
}

module.exports = NotesHeader;