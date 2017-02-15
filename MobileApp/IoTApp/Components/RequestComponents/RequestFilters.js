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
import Selection from 'react-native-selection';

export default class RequestFilters extends Component{
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
    
    /*returnDataOnSelection(e){
        console.log('Value : ' + e.value + ' Name : ' + e.name);
    }*/
    
    render() {
        const options = [
          {
            name: 'All Service Owners',
            value: 'All Service Owners',
            icon: '',
          },
          {
            name: 'DISCOVERe Hub',
            value: 'DISCOVEReHub',
            icon: '',
          },
          {
            name: 'Library IT',
            value: 'LibraryIT',
            icon: '',
          },
        ];
        return (
            <Container>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Filter Requests</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>
                        <Icon style={{fontSize: fontScale+10, color: 'white'}} name='ios-close' />
                    </Button2>
                </Header>
                <View style={{flex: 1}}>
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
                    {/*<Button2>
                        <Selection 
                            title="Select Service Owner" 
                            options={options} 
                            onSelection={this.returnDataOnSelection.bind(this)}
                            style={{
                              body: null,
                              option: null,
                            }}
                            iconSize={20}
                            iconColor="#eee"
                          />
                    </Button2>*/}
                </View>
            </Container>
        );
    }
}
