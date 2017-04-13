import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import {Col, Row, Grid, Button} from 'native-base';

import styles from '../../Styles.js';

export default class NotesButtons extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <View style={styles.notesButtonsContainer}>
                <Button style={{padding: 5}} onPress={this.props.onAdd.bind(this)}>
                    <Text style={styles.buttonText}>
                        ADD NOTES
                    </Text>
                </Button>
                <Button danger style={{padding: 5}} onPress={this.props.confirmClose.bind(this)}>
                    <Text style={styles.buttonText}>
                        CLOSE REQUEST
                    </Text>
                </Button>
            </View>
        );
    }
}