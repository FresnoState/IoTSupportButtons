import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Item
} from 'react-native';
import {Col, Row, Grid, Container, Content, Header, Title, Icon, Button} from 'native-base';

import styles from '../../Styles.js';

export default class RequestFilters extends Component{
    constructor(props){
        super(props);
        this.state = {selectedServiceOwner: this.props.viewServiceOwner, selectedStatus: this.props.viewStatus};
    }
    
    onServiceOwnerChange(serviceOwner){
        if(serviceOwner == "All Service Owners" && !(this.state.selectedStatus == "New/Open" || this.state.selectedStatus == "All Statuses")){
            alert("Select a specific service owner to filter by a single status");
            this.setState({selectedStatus: "All Statuses"});
        }
        this.setState({selectedServiceOwner: serviceOwner});
    }
    
    onStatusChange(status){
        if(this.state.selectedServiceOwner == "All Service Owners" && !(status == "New/Open" || status == "All Statuses")){
            alert("Select a specific service owner to filter by a single status");
            this.setState({selectedStatus: "All Statuses"});
        }
        else{
            this.setState({selectedStatus: status});
        }
    }
    
    clearDefaults(){
        this.setState({selectedServiceOwner: "All Service Owners"});
        this.setState({selectedStatus: "New/Open"});
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
                    <View style={styles.filterMessageContainer}>
                        <Text style={styles.filterMessageText}>
                           Filter requests by service owner and/or status.{"\n"}
                           Select a service owner before selecting status "New", "Open", or "Closed".
                        </Text>
                    </View>
                    <View style={styles.filterBanner}>
                        <Text style={styles.filterBannerText}>SELECT SERVICE OWNER</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Picker
                            itemStyle={styles.pickerItem}
                            selectedValue={this.state.selectedServiceOwner}
                            onValueChange={this.onServiceOwnerChange.bind(this)}
                        >
                            <Item label="All" value="All Service Owners" />
                            <Item label="DISCOVERe Hub" value="DISCOVEReHub" />
                            <Item label="Pay for Print" value="P4P" />
                        </Picker>
                    </View>
                    <View style={styles.filterBanner}>
                        <Text style={styles.filterBannerText}>SELECT STATUS</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Picker
                            itemStyle={styles.pickerItem}
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
                    <View style={styles.filterButtonContainer}>
                        <Button style={{padding: 5}} onPress={this.clearDefaults.bind(this)}>
                            <Text style={styles.buttonText}>
                                CLEAR
                            </Text>
                        </Button>
                        <Button style={{padding: 5}} onPress={this.submit.bind(this)}>
                            <Text style={styles.buttonText}>
                                FILTER
                            </Text>
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}
