export function getRequests(viewServiceOwner, viewStatus, callback){
    //alert("fetching data");
    var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/dashboard/';
    if(viewServiceOwner != "All Service Owners"){
        url += viewServiceOwner;
        if(viewStatus != "All Statuses"){
            url += "/"+viewStatus;
        }
    }
    fetch(url)
    .then((response) => {
        return response.json();
    })                             
    .then((json) => callback(json))
    .catch((error) => {
        console.log(error);
    });
}

export function updateRequestStatus(requestData, status){
    var url = 'https://aa0zsc2r3j.execute-api.us-west-2.amazonaws.com/Pilot_2173/request/';
    url += requestData.serialNumber.S+'/'+requestData.timeStamp.S;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'currstatus': status
        })
    })
    .then((response) => {
        console.log(response);
    })                             
    .catch((error) => {
        console.log(error);
    });
}