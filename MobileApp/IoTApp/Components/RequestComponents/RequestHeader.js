import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {Col, Row, Grid} from 'native-base';

export default class RequestHeader extends Component{
    constructor(props){
        super(props);
    }
    
    setActive(col){
        this.props.onSortCol(col);
    }
    
    render(){
        return (
            <View style={{flex: 1, marginTop: 10, marginBottom: 5}}>
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFF'}, styles.inactive}>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'time' ? styles.active : styles.inactive} 
                        onPress={() => this.setActive('time')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Time
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'location' ? styles.active : styles.inactive} 
                        onPress={() => this.setActive('location')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Location
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'item' ? styles.active : styles.inactive} 
                        onPress={() => this.setActive('item')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Item
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'status' ? styles.active : styles.inactive} 
                        onPress={() => this.setActive('status')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Status
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

styles = StyleSheet.create({
  active: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#d4d4de',
    borderWidth: 0.5,
    backgroundColor: '#d0d0db',
  },
  inactive: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#d4d4de',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
  },
});