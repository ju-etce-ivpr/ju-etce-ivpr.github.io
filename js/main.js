var dates = ["2023-11-09","2023-11-16","2023-11-23", "2023-11-30"]

function isFutureDate(dateString){
    var currentDate = new Date();
    var assDate = new Date(Date.parse(dateString));
    if(assDate>=currentDate){
        return true;
    }
}

function displayOnDate(){
    // Fetching anchor items directly using class "nav-link"
    var listItems = document.getElementsByClassName("nav-link")
    // console.log(listItems);
    for(i in dates){
        if (isFutureDate(dates[i])){
            // Disable ith day link
            link = listItems[i];
            console.log(link);
            link.onclick = function(event) {
                event.preventDefault();
            }
        }
    }
}
