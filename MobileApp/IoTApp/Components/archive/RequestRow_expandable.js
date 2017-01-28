import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  LayoutAnimation,
  Navigator
} from 'react-native';

class RequestRowDefault extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.card}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: fontScale}}>Default-------------------------{"\t"}</Text>
                    <TouchableOpacity onPress={this.props.onPressArrow}>
                        <Text style={{fontSize: fontScale}}>v</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class RequestRowExpanded extends Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <View style={styles.card}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: fontScale}}>Expanded--------------------{"\t"}</Text>
                    <TouchableOpacity onPress={this.props.onPressArrow}>
                        <Text style={{fontSize: fontScale}}>^</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.room+"\t\t"}</Text>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.phone+"\t\t"}</Text>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.time+"\t\t"}</Text>
                </View>
            </View>
        );
    }
}


export class RequestRow extends Component{
    constructor(props){
        super(props);
        this.state = {expanded: false};
    }
    
    onPressArrow(){
        LayoutAnimation.easeInEaseOut();
        this.setState((state) => ({expanded: !state.expanded}));
    }
    
    goToNotes(){ //navigates to appropriate note form scene while passing the request Data as props
        switch(this.props.requestData.status){
            case 'N':
                this.props.navigator.push({
                    title: "Contact Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData    //passes requestData json
                    }
                });
                break;
            case 'C':
                this.props.navigator.push({
                    title: "Service Notes", 
                    index: 1,
                    passProps: {
                        "requestData": this.props.requestData    
                    }
                });
                break;
        }
        
    }
    
    renderStatusColumn(){ //renders the status column of the row
        if(this.props.requestData.status != 'S' && this.props.requestData.department != "Closed" ){ //status is only "touchable" if it is not closed/serviced
            return (
                <TouchableHighlight onPress={this.goToNotes.bind(this)}>
                    <Text style={{fontSize: fontScale}}>{this.props.requestData.status}</Text>
                </TouchableHighlight>
            );
        }
        else{
            return (
                <Text style={{fontSize: fontScale}}>{this.props.requestData.status}</Text>
            );
        }
    }
    
    render() {
        if(!this.state.expanded)
            return (<RequestRowDefault onPressArrow={this.onPressArrow.bind(this)} {...this.props} />);
        else
            return (<RequestRowExpanded onPressArrow={this.onPressArrow.bind(this)} {...this.props} />);
    }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#DCDCDC',
  },
});

module.exports = RequestRow;