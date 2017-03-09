import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Item
} from 'react-native';
import Dimensions from 'Dimensions';
import {Col, Row, Grid, Container, Content, Header, Title, Icon, Button} from 'native-base';

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
                    <Title style={styles.headerTitle}>FILTER OPTIONS</Title>
                    <Button transparent onPress={this.onCancel.bind(this)}>
                        <Icon style={styles.headerIcon} name='ios-arrow-back' />
                    </Button>
                </Header>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{flex: 0.5}}></View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbe4f2'}}>
                        <Text style={{fontSize: fontScale*1.5, color: '#0e51c3'}}>SELECT SERVICE OWNER</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Picker
                            itemStyle={{fontSize: fontScale, height: Dimensions.get('window').height*0.2}}
                            selectedValue={this.state.selectedServiceOwner}
                            onValueChange={this.onServiceOwnerChange.bind(this)}
                        >
                            <Item label="All" value="All Service Owners" />
                            <Item label="DISCOVERe Hub" value="DISCOVEReHub" />
                            <Item label="Library IT" value="LibraryIT" />
                        </Picker>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbe4f2'}}>
                        <Text style={{fontSize: fontScale*1.5, color: '#0e51c3'}}>SELECT STATUS</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Picker
                            itemStyle={{fontSize: fontScale, height: Dimensions.get('window').height*0.2}}
                            selectedValue={this.state.selectedStatus}
                            onValueChange={this.onStatusChange.bind(this)}
                        >
                            <Item label="All" value="All Statuses" />
                            <Item label="New/Open" value="New/Open" />
                            <Item label="New" value="new" />
                            <Item label="Open" value="open" />
                            <Item label="Closed" value="closed" />
                        </Picker>
                    </View>
                    {/*<View style={{flex: 1}}></View>*/}
                    <View style={{flex: 1.5, flexDirection: 'row', justifyContent: 'center'}}>
                        <Button onPress={this.submit.bind(this)}>FILTER</Button>
                    </View>
                </View>
            </Container>
        );
    }
}
