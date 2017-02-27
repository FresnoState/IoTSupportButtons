import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Item,
  Button
} from 'react-native';

import {Col, Row, Grid, Container, Content, Header, Title, Icon} from 'native-base';
import {Button as Button2} from 'native-base';

export default class RequestFilters extends Component{
    constructor(props){
        super(props);
        this.state = {selectedServiceOwner: this.props.viewServiceOwner, selectedStatus: this.props.viewStatus};
    }
    
    onServiceOwnerChange(serviceOwner){
        if(serviceOwner == "All Service Owners" && !(this.state.selectedStatus == "New/Open" || this.state.selectedStatus == "All")){
            this.setState({selectedStatus: "All Statuses"});
        }
        this.setState({selectedServiceOwner: serviceOwner});
    }
    
    onStatusChange(status){
        if(this.state.selectedServiceOwner == "All Service Owners" && !(status == "New/Open" || status == "All")){
            this.setState({selectedStatus: "All Statuses"});
        }
        else{
            this.setState({selectedStatus: status});
        }
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    submit(){
        this.props.onFilter(this.state.selectedServiceOwner, this.state.selectedStatus);
        this.props.navigator.pop(); 
    }
    
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Filter Requests</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>
                        <Icon style={{fontSize: fontScale+10, color: 'white'}} name='ios-arrow-back' />
                    </Button2>
                </Header>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: fontScale, margin: 10}}>Select Service Owner</Text>
                    <Picker
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.selectedServiceOwner}
                        onValueChange={this.onServiceOwnerChange.bind(this)}
                    >
                        <Item label="All" value="All Service Owners" />
                        <Item label="DISCOVERe Hub" value="DISCOVEReHub" />
                        <Item label="Library IT" value="LibraryIT" />
                    </Picker>
                    <Text style={{fontSize: fontScale, margin: 10}}>Select Status</Text>
                    <Picker
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.selectedStatus}
                        onValueChange={this.onStatusChange.bind(this)}
                    >
                        <Item label="All" value="All Statuses" />
                        <Item label="New/Open" value="New/Open" />
                        <Item label="New" value="new" />
                        <Item label="Open" value="open" />
                        <Item label="Closed" value="closed" />
                    </Picker>
                    <Button title="Filter" onPress={this.submit.bind(this)} />
                </View>
            </Container>
        );
    }
}
