import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Button} from 'native-base';

export default class NotesButtons extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                <Button style={{padding: 5}} onPress={this.props.onAdd.bind(this)}>
                    <Text style={{margin: 10, fontSize: fontScale*1.5, fontWeight: '500', color: 'white'}}>
                        ADD NOTES
                    </Text>
                </Button>
                <Button danger style={{padding: 5}} onPress={this.props.confirmClose.bind(this)}>
                    <Text style={{margin: 10, fontSize: fontScale*1.5, fontWeight: '500', color: 'white'}}>
                        CLOSE REQUEST
                    </Text>
                </Button>
            </View>
        );
    }
}