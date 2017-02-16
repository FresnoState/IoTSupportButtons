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
import ModalDropdown from 'react-native-modal-dropdown';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

export default class RequestFilters extends Component{
    constructor(props){
        super(props);
        this.state = {selectedServiceOwner: this.props.viewServiceOwner, selectedStatus: this.props.viewStatus};
    }
    
    onServiceOwnerChange(serviceOwner){
        if(serviceOwner == "All Service Owners"){
            this.setState({selectedStatus: "All Statuses"});
        }
        this.setState({selectedServiceOwner: serviceOwner});
    }
    
    onStatusChange(status){
        if(this.state.selectedServiceOwner == "All Service Owners"){
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
        this.props.onFilterServiceOwner(this.state.selectedServiceOwner, this.state.selectedStatus);
        this.props.navigator.pop(); 
    }
    
    /*returnDataOnSelection(e){
        console.log('Value : ' + e.value + ' Name : ' + e.name);
    }
    
    _getOptionList() {
        return this.refs['OPTIONLIST'];
    }*/
    
    render() {
        /*const options = [
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
        ];*/
        return (
            <Container>
                <Header style={{backgroundColor: '#002C76'}}>
                    <Title style={{color: 'white'}}>Filter Requests</Title>
                    <Button2 transparent onPress={this.onCancel.bind(this)}>
                        <Icon style={{fontSize: fontScale+10, color: 'white'}} name='ios-close' />
                    </Button2>
                </Header>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: fontScale, margin: 10}}>Select Service Owner</Text>
                    <Picker
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.selectedServiceOwner}
                        onValueChange={this.onServiceOwnerChange.bind(this)}
                    >
                        <Item label="All Service Owners" value="All Service Owners" />
                        <Item label="DISCOVERe Hub" value="DISCOVEReHub" />
                        <Item label="Library IT" value="LibraryIT" />
                    </Picker>
                    <Text style={{fontSize: fontScale, margin: 10}}>Select Status</Text>
                    <Picker
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.state.selectedStatus}
                        onValueChange={this.onStatusChange.bind(this)}
                    >
                        <Item label="All Statuses" value="All Statuses" />
                        <Item label="New" value="new" />
                        <Item label="Open" value="open" />
                        <Item label="Closed" value="closed" />
                    </Picker>
                    <Button title="Filter" onPress={this.submit.bind(this)} />
                    {/*<ModalDropdown style={{flex: 1}}
                        options={['DISCOVERe Hub', 'Library IT']}
                    />
                    <Button2>
                        <Selection 
                            title="Select Service Owner" 
                            options={options} 
                            onSelection={this.returnDataOnSelection.bind(this)}
                            style={{
                              body: null,
                              option: null,
                            }}
                          />
                    </Button2>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Select
                            width={250}
                            optionListRef={this._getOptionList.bind(this)}
                        >
                            <Option>DISCOVERe Hub</Option>
                            <Option>Library ID</Option>
                        </Select>
                    </View>
                    <OptionList ref="OPTIONLIST"/>*/}
                </View>
            </Container>
        );
    }
}
