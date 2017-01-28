import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  Picker,
  Item
} from 'react-native';

export class RequestFilters extends Component{
    constructor(props){
        super(props);
    }
    
    onFilterStage(stage){
        this.props.onFilterStage(stage); //calls parent component RequestList's onFilterStage function, handles state change and filtration
    }
    
    onFilterDept(dept){
        this.props.onFilterDept(dept); //calls parent component RequestList's onFilterStage function, handles state change and filtration
    }
    
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: fontScale, textAlign: 'center'}}>Request Stage</Text>
                    <Picker 
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.props.viewStage}
                        onValueChange={(stage) => (this.onFilterStage(stage))}
                    >
                        <Item label="Open" value="Open" />
                        <Item label="Closed" value="Closed" />
                        <Item label="All" value="All" />
                    </Picker>
                </View>
                <Text>{"\t"}</Text>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: fontScale, textAlign: 'center'}}>Department</Text>
                    <Picker 
                        itemStyle={{fontSize: fontScale}}
                        selectedValue={this.props.viewDept}
                        onValueChange={(dept) => (this.onFilterDept(dept))}
                     >  
                        <Item label="All" value="All" />
                        <Item label="CVS" value="CVS" />
                        <Item label="D. Hub" value="D. Hub" />
                        <Item label="Camp. Fac." value="Camp. Fac." />
                    </Picker>
                </View>
            </View>
        );
    }
}

module.exports = RequestFilters;