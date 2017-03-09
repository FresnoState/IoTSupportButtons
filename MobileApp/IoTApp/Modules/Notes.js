export function getNotes(requestData, callback){
    var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/notes/';
    url += requestData.serialNumber.S+'/'+requestData.timeStamp.S;
    fetch(url)
    .then((response) => {
        return response.json();
    }) 
    .then((json) => callback(json))
    .catch((error) => {
        //console.log(error);
    });
}

export function addNotes(requestData, notes){
    var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/notes/';
    url += requestData.serialNumber.S+'/'+requestData.timeStamp.S;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'timestamp': new Date().getTime().toString(),
            'notes': encodeURIComponent(notes)
        })
    })
    /*.then((response) => {
        console.log(response);
    })*/                             
    .catch((error) => {
        //console.log(error);
    });
}