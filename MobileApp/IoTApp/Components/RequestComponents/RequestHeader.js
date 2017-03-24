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
    
    getIcon(col){
        if(col == this.props.sortCol)
            return "md-arrow-dropup";
        else
            return "md-arrow-dropdown";
    }
    
    render(){
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 10, padding: 10, marginBottom: 0, backgroundColor: '#002C76', borderRadius: 5}}>
                    <TouchableOpacity 
                        style={{flex: 0.25,flexDirection: 'row'}}
                        onPress={() => this.setActive('time')}
                    >
                            <Text style={{fontSize: fontScale, color: 'white', padding: 5}}>
                                Time
                            </Text>
                            <Icon style={{fontSize: fontScale*2.5, color: 'white'}} name={this.getIcon("time")} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 0.3,flexDirection: 'row'}} 
                        onPress={() => this.setActive('location')}
                    >
                            <Text style={{fontSize: fontScale, color: 'white', padding: 5}}>
                                Location
                            </Text>
                            <Icon style={{fontSize: fontScale*2.5, color: 'white'}} name={this.getIcon("location")} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 0.25,flexDirection: 'row'}}
                        onPress={() => this.setActive('item')}
                    >
                            <Text style={{fontSize: fontScale, color: 'white', padding: 5}}>
                                Item
                            </Text>
                            <Icon style={{fontSize: fontScale*2.5, color: 'white'}} name={this.getIcon("item")} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 0.2,flexDirection: 'row'}}
                        onPress={() => this.setActive('status')}
                    >
                            <Text style={{fontSize: fontScale, color: 'white', padding: 5}}>
                                Status
                            </Text>
                            <Icon style={{fontSize: fontScale*2.5, color: 'white'}} name={this.getIcon("status")} />
                    </TouchableOpacity>
                    {/*<TouchableOpacity 
                        style={this.props.sortCol == 'status' ? styles.activeSortCol : styles.inactiveSortCol} 
                        onPress={() => this.setActive('status')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Status
                            </Text>
                    </TouchableOpacity>*/}
            </View>
        );
    }
}

