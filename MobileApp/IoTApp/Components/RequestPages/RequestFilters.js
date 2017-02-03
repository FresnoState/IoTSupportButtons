import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Item,
  Button
} from 'react-native';

import {Col, Row, Grid, Container, Content, Header, Title} from 'native-base';
import {Button as Button2} from 'native-base';

export class RequestFilters extends Component{
    constructor(props){
        super(props);
        this.state = {selectedServiceOwner: this.props.viewServiceOwner};
    }
    
    onCancel(){ //"X" button functionality for closing out of scene
        this.props.navigator.pop();
    }
    
    submit(){
        this.props.onFilterServiceOwner(this.state.selectedServiceOwner);
        this.props.navigator.pop(); 
    }
    
    render() {
        return (
            <Container>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Filter Requests</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>x</Button2>
                </Header>
                <Content>
                    <Text style={{fontSize: fontScale}}>Select Service Owner</Text>
                    <Picker
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.selectedServiceOwner}
                        onValueChange={(serviceOwner) => (this.setState({selectedServiceOwner: serviceOwner}))}
                    >
                        <Item label="All Service Owners" value="All Service Owners" />
                        <Item label="DISCOVERe Hub" value="DISCOVEReHub" />
                        <Item label="Library IT" value="LibraryIT" />
                    </Picker>
                    <Button title="Filter" onPress={this.submit.bind(this)} />
                </Content>
            </Container>
        );
    }
}

module.exports = RequestFilters;