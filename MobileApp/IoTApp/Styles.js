import {StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';
//will use this as a global style sheet

var width = Dimensions.get('window').width;
global.fontScale; //will use this as a base font scale, later on will make it local variable
if(width > 900){
    fontScale = 18;
}
else if(width > 500){
    fontScale = 14;
}
else if(width > 300){
    fontScale = 12;
}
else{
    fontScale = 10;
};

export default styles = StyleSheet.create({
    headerIcon: {
        fontSize: fontScale + 10,
        color: '#ffffff'
    },
    headerTitle: {
        color: '#ffffff'  
    },
    backgroundImage: {
        flex: 1,
        margin: 10,
        marginBottom: 0,
        borderRadius: 5,
        backgroundColor: 'transparent',
        width: undefined,
        height: undefined,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImageText: {
        color: '#FFF',
        fontSize: fontScale*2,
        fontWeight: '900'
    },
    buttonText: {
        margin: 10,
        color: 'white',
        fontSize: fontScale*1.5,
        fontWeight: '500'
    },
    filterMessageContainer: {
        flex: 0.75,
        margin: 20,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterMessageText: {
        fontSize: fontScale*1.1,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    filterBanner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbe4f2'
    },
    filterBannerText: {
        fontSize: fontScale*1.5,
        fontWeight: 'bold',
        color: '#0e51c3'
    },
    filterButtonContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    notesButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10
    },
    pickerItem: {
        fontSize: fontScale,
        height: Dimensions.get('window').height*0.2
    },
    /*activeSortCol: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#d4d4de',
        borderWidth: 0.5,
        backgroundColor: '#d0d0db',
    },
    inactiveSortCol: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#d4d4de',
        borderWidth: 0.5,
        backgroundColor: '#FFF',
    },*/
    requestRowContainer: {
        marginLeft: 10, 
        marginRight: 10,
    },
    requestRowCard: {
    
    },
    requestRowCol: {
        
    },
    requestRowText: {
        
    },
    notesContainer: {
        backgroundColor: '#efefef',
        margin: 10,
        borderRadius: 10
    },
    noteCard: {
        backgroundColor: '#EFF2B9',
        borderRadius: 10,
        margin: 1,
        padding: 5
    },
    noteText: {
        padding: 5,
        fontSize: fontScale*1.2
    },
    noteDateText: {
        padding: 5,
        fontSize: fontScale
    },
    notesInputContainer: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    notesInput: {
        /*backgroundColor: '#dddddd'*/
        backgroundColor: '#fbfbfb',
        height: Dimensions.get('window').height*0.2,
        width: Dimensions.get('window').width-20,
        fontSize: fontScale,
        borderWidth: 1,
        borderRadius: 10
    },
    statusBanner: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    statusBannerText: {
        fontSize: fontScale*2.5,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    statusButton: {
        flexDirection: 'row', 
        margin: 10, 
        padding: 10, 
        borderRadius: 10, 
        position: 'absolute', 
        top: 5, 
        right: 15, 
        shadowColor: '#333333', 
        shadowOpacity: 1, 
        shadowOffset: {
            width: 1, 
            height: 3
        }
    },
    statusIcon: {
        fontSize: fontScale*1.8,
        color: 'white'
    }
    //add notes header classes
});