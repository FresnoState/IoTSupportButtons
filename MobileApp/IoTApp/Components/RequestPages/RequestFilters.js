import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Item
} from 'react-native';

import {Col, Row, Grid, Container, Content, Header, Title, Button} from 'native-base';

export class RequestFilters extends Component{
    constructor(props){
        super(props);
        this.state = {selectedServiceOwner: this.props.viewServiceOwner};
    }
    
    submit(){
        this.props.onFilterServiceOwner(this.state.selectedServiceOwner);
        this.props.navigator.pop(); 
    }
    
    render() {
        return (
            <Container>
                <Header>
                    <Title>Filter Requests</Title>
                </Header>
                <Content>
                    <Text style={{fontSize: fontScale}}>Select Service Owner</Text>
                    <Picker
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.selectedServiceOwner}
                        onValueChange={(serviceOwner) => (this.setState({selectedServiceOwner: serviceOwner}))}
                    >
                        <Item label="All Service Owners" value="All Service Owners" />
                        <Item label="DISCOVERe Hub" value="DISCOVERe Hub" />
                        <Item label="Library IT" value="Library IT" />
                    </Picker>
                    <Button onPress={this.submit.bind(this)}>
                        OK
                    </Button>
                </Content>
            </Container>
        );
    }
}

module.exports = RequestFilters;