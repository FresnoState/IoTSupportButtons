=========================
By Max Tsai
Last Updated: 02/01/2017
=========================

$RESTENDURL=https://%RESTENDPOINT%.execute-api.us-west-2.amazonaws.com/
--------

1. $RESTENDURL/Pilot_2173/dashboard/{division}/{currstatus}

ex. Request: /dashboard/
method: GET 
return: Listing ALL the Requests

ex. Request: /dashboard/DISCOVEReHub
method: GET 
return: Listing ALL the Requests for a particular division (Service Owner), i.e. DISCOVEReHub

ex. Request: /dashboard/DISCOVEReHub/open
method: GET 
return: Listing ALL the Requests for a particular division (Service Owner) with status of new, open, or close

--------

2. $RESTENDURL/Pilot_2173/request/{serialnumber}/{timestamp}

ex.  Request: /request/G030JF059224G3MH/1485978175028
method: GET
{
  "body-json": {
    "Count": 1,
    "Items": [
      {
        "action": {
          "S": "visit"
        },
        "location": {
          "S": "McKee Fisk 104"
        },
        "clicktype": {
          "S": "MAX"
        },
        "batteryvoltage": {
          "S": "9999mV"
        },
        "currstatus": {
          "S": "new"
        },
        "timeStamp": {
          "S": "1485978175028"
        },
        "item": {
          "S": "84180"
        },
        "description": {
          "S": "DISCOVERe Classroom"
        },
        "division": {
          "S": "DISCOVEReHub"
        },
        "serialNumber": {
          "S": "G030JF059224G3MH"
        }
      }
    ],
    "ScannedCount": 1
  }
}

ex.  Request: /request/G030JF059224G3MH/1485978175028
method: POST (for currstatus update)
Request Body:
{
    "currstatus": "TEST"
}
Response Body: {} if no error

--------

3. $RESTENDURL/Pilot_2173/notes/{serialnumber}/{timestamp}

ex.  Request: /notes/G030JF059224G3MH/1485978175028 
method: GET
Response:
{
  "body-json": {
    "Count": 2,
    "Items": [
      {
        "timeStamp": {
          "S": "1485978175028"
        },
        "notes": {
          "S": "new:1485978175028"
        },
        "serialNumber": {
          "S": "G030JF059224G3MH|1485978175028"
        }
      },
      {
        "timeStamp": {
          "S": "1485978175099"
        },
        "notes": {
          "S": "mvrepnveoirv neroivnreoi vneiornver nveroiv nreoiv berojv erojv bre nerjo"
        },
        "serialNumber": {
          "S": "G030JF059224G3MH|1485978175028"
        }
      }
    ],
    "ScannedCount": 2
  }
}

ex.  Request: /notes/G030JF059224G3MH/1485978175028 
method: POST
Request Body:
{
    "timestamp": "1485978179999",
    "notes": "This is a test!"
}
Response Body: {} if no error


