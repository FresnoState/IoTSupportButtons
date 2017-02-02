import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';

import {Col, Row, Grid, Header, Title} from 'native-base';

export class NotesHeader extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <View style={{flex: 1, alignItems: 'center'}}>
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