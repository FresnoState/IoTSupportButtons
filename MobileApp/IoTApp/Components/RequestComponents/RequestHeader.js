import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {Col, Row, Grid, Icon} from 'native-base';

export default class RequestHeader extends Component{
    constructor(props){
        super(props);
    }
    
    setActive(col){
        this.props.onSortCol(col);
    }
    
    render(){
        return (
            <View style={{flex: 1, margin: 10, marginBottom: 0}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'time' ? styles.activeSortCol : styles.inactiveSortCol}
                        onPress={() => this.setActive('time')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Time
                            </Text>
                            {/*<Icon style={{fontSize: fontScale*2}} name='ios-arrow-down' />*/}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'location' ? styles.activeSortCol : styles.inactiveSortCol} 
                        onPress={() => this.setActive('location')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Location
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'item' ? styles.activeSortCol : styles.inactiveSortCol} 
                        onPress={() => this.setActive('item')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Item
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'status' ? styles.activeSortCol : styles.inactiveSortCol} 
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

