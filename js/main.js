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

function readFile() {
  const file = document.getElementById('fileInput').files[0];
  document.getElementById('fileContents').innerHTML= "";

  if (file) {
    if (file.name.endsWith('.c')){
      const reader = new FileReader();
    reader.readAsText(file,"UTF-8");
    
    reader.onload = function(event) {
      // document.getElementById('fileContents').innerHTML= event.target.result;
      compiler(event.target.result);
    };

    reader.onerror = function(event) {
      document.getElementById('fileContents').innerHTML= "error reading file";
    };
    }
    else{
      alert('File must be of .c extension');
      document.getElementById('fileInput').value = '';
    }
      
  } else {
    alert('No file selected.');
  }
}

function compiler(c_code){

  const data = JSON.stringify({
      language: 'c',
      version: 'latest',
      // code: "#include<stdio.h>\nint main(){\nprintf(\"Hellow World\");\n return 0;}",
      code: c_code,
      input: null
  });
  //var XMLHttpRequest = require('xhr2');//only for nodejs
  //  var xhr = new XMLHttpRequest();
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
          document.getElementById('fileContents').innerHTML= this.responseText;
          console.log(this.responseText);
      }
  });
  
  xhr.open('POST', 'https://online-code-compiler.p.rapidapi.com/v1/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('X-RapidAPI-Key', '79090012c5msh3852509e6840b87p12efbfjsn1b1eb828a8d3');
  xhr.setRequestHeader('X-RapidAPI-Host', 'online-code-compiler.p.rapidapi.com');
  
  xhr.send(data);
}
