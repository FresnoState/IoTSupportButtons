export default function getSortFunction(activeCol){
    switch(activeCol){
        case 'time':
            return sortByTime;
            break;
        case 'location':
            return sortByLocation;
            break;
        case 'item':
            return sortByItem;
            break;
        case 'status':
            return sortByStatus;
            break;
        case 'action':
            return sortByAction;
            break;
        default:
            return sortByTime;
            break;
    }
}  


function sortByTime(a, b) {
      var time1 = a.timeStamp.S;
      var time2 = b.timeStamp.S;
      if(time1 < time2){
          return 1;
      }
      if(time1 > time2){
          return -1;
      }
      return 0;
  }

function sortByLocation(a, b){
    var location1 = a.location.S.toLowerCase();
    var location2 = b.location.S.toLowerCase();
    if(location1 < location2){
        return -1;
    }
    if(location1 > location2){
        return 1;
    }
    return 0;
}

function sortByItem(a, b){
    var item1 = a.item.S;
    var item2 = b.item.S;
    if(item1 < item2){
        return -1
    }
    if(item1 > item2){
        return 1;
    }
    return 0;
}

function sortByStatus(a, b){
    var status1 = a.currstatus.S.toLowerCase();
    var status2 = b.currstatus.S.toLowerCase();
    if(status1 < status2){
        return -1
    }
    if(status1 > status2){
        return 1;
    }
    return 0;
}

function sortByAction(a, b){
    var action1 = a.action.S.toLowerCase();
    var action2 = b.action.S.toLowerCase();
    if(action1 < action2){
        return -1
    }
    if(action1 > action2){
        return 1;
    }
    return 0;
}


