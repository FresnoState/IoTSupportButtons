import {StyleSheet} from 'react-native';
import Dimensions from 'Dimensions';
//will use this as a global style sheet

var width = Dimensions.get('window').width;
global.fontScale; //will use this as a base font scale, later will on will make it local variable
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
    NotesContainer: {
        
    },
    NoteCard: {
        
    },
    NoteText: {
        
    },
    NotesInput: {
        
    }
    //add notes header classes
});