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
        //this.state = {active: 'time'};
    }
    
    setActive(col){
        //this.setState({active: col});
        this.props.onSortCol(col);
    }
    
    renderDescCol(){
        if(is_iPad){
            return (
                <View style={styles.inactive}>
                    <Text style={{fontSize: fontScale}}>
                            Description
                        </Text>
                </View>
            );
        }
        else{
            return null;
        }
    }
    
    render(){
        var descCol = this.renderDescCol();
        return (
            <View style={{flex: 1, marginTop: 10, marginBottom: 5}}>
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFF'}, styles.inactive}>
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
                        style={this.props.sortCol == 'action' ? styles.active : styles.inactive} 
                        onPress={() => this.setActive('action')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Action
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={this.props.sortCol == 'time' ? styles.active : styles.inactive} 
                        onPress={() => this.setActive('time')}
                    >
                            <Text style={{fontSize: fontScale}}>
                                Time
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
                    {descCol}
                </View>
            </View>
        );
        
        
        /*return (
            <View style={{flex: 1, backgroundColor: '#FFF', marginTop: 10, marginBottom: 5}}>
                <Grid>
                    <Row>
                        <Col style={this.state.active == 'location' ? styles.active: styles.inactive}>
                            <Text style={{fontSize: fontScale}}>
                                Location
                            </Text>
                        </Col>
                        <Col style={this.state.active == 'item' ? styles.active: styles.inactive}>
                            <Text style={{fontSize: fontScale}}>
                                Item
                            </Text>
                        </Col>
                        <Col style={this.state.active == 'action' ? styles.active: styles.inactive}>
                            <Text style={{fontSize: fontScale}}>
                                Action
                            </Text>
                        </Col>
                        <Col style={this.state.active == 'time' ? styles.active: styles.inactive}>
                            <Text style={{fontSize: fontScale}}>
                                Time
                            </Text>
                        </Col>
                        <Col style={this.state.active == 'status' ? styles.active: styles.inactive}>
                            <Text style={{fontSize: fontScale}}>
                                Status
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );*/
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