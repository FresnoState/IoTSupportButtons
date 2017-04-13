import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import {Col, Row, Grid, Icon} from 'native-base';

import styles from '../../Styles.js';

export default class RequestHeader extends Component{
    constructor(props){
        super(props);
    }
    
    setActive(col){
        this.props.onSortCol(col);
    }
    
    getIcon(col){
        if(col == this.props.sortCol)
            return "md-arrow-dropup";
        else
            return "md-arrow-dropdown";
    }
    
    render(){
        return (
            <View style={styles.sortHeaderContainer}>
                    <TouchableOpacity 
                        style={{flex: 0.25, flexDirection: 'row'}}
                        onPress={() => this.setActive('time')}
                    >
                            <Text style={this.props.sortCol == 'time' ? styles.activeSortText : styles.inactiveSortText}>
                                Time
                            </Text>
                            <Icon style={styles.sortIcon} name={this.getIcon("time")} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 0.3, flexDirection: 'row'}} 
                        onPress={() => this.setActive('location')}
                    >
                            <Text style={this.props.sortCol == 'location' ? styles.activeSortText : styles.inactiveSortText}>
                                Location
                            </Text>
                            <Icon style={styles.sortIcon} name={this.getIcon("location")} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 0.25, flexDirection: 'row'}}
                        onPress={() => this.setActive('item')}
                    >
                            <Text style={this.props.sortCol == 'item' ? styles.activeSortText : styles.inactiveSortText}>
                                Item
                            </Text>
                            <Icon style={styles.sortIcon} name={this.getIcon("item")} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 0.2, flexDirection: 'row'}}
                        onPress={() => this.setActive('status')}
                    >
                            <Text style={this.props.sortCol == 'status' ? styles.activeSortText : styles.inactiveSortText}>
                                Status
                            </Text>
                            <Icon style={styles.sortIcon} name={this.getIcon("status")} />
                    </TouchableOpacity>
            </View>
        );
    }
}

