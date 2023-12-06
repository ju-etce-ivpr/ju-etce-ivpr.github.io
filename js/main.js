var dates = ["2023-11-09","2023-11-16", "2023-11-29", "2023-12-06", "2023-12-13"]

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
        console.log(i)
        if (isFutureDate(dates[i])){
            // Disable ith day link
            link = listItems[i];
            console.log(link);
            link.onclick = function(event) {
                event.preventDefault();
            }
        }
    }
  displayInputFile();
}

function displayInputFile(){

  const paragraphs = document.querySelectorAll('#content p');
  var i =1;
  paragraphs.forEach(para => {
    // Adding file input
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('id', 'fileInput'+i);

    // Adding button
    const button = document.createElement('button');
    button.textContent = 'Find output';
    button.onclick = function() {
      readFile(fileInput.getAttribute('id'),div.getAttribute('id'));
    };  
    
    // Adding div
    const div = document.createElement('div');
    div.setAttribute('id','fileContents'+i);

    // Adding a non-breaking space
    const space = document.createElement('span');
    space.innerHTML = '&nbsp;'; 

    // Insert the button after the paragraph
    para.insertAdjacentElement('afterend', fileInput);
    para.insertAdjacentElement('afterend', space);
    para.insertAdjacentElement('afterend', button);
    para.insertAdjacentElement('afterend', div);
    i++;
  });

}

function readFile(fileInput,divContent) {
  const file = document.getElementById(fileInput).files[0];
  document.getElementById(divContent).innerHTML= "";

  if (file) {
    if (file.name.endsWith('.c')){
      const reader = new FileReader();
    reader.readAsText(file,"UTF-8");
    
    reader.onload = function(event) {
      // document.getElementById('fileContents').innerHTML= event.target.result;
      compiler(event.target.result,divContent);
    };

    reader.onerror = function(event) {
      document.getElementById(divContent).innerHTML= "error reading file";
    };
    }
    else{
      alert('File must be of .c extension');
      document.getElementById(fileInput).value = '';
    }
      
  } else {
    alert('No file selected.');
  }
}

function compiler(c_code,divContent){

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
          document.getElementById(divContent).innerHTML= JSON.parse(this.responseText)["output"];
          // console.log(JSON.parse(this.responseText)["output"]);
      }
  });
  
  xhr.open('POST', 'https://online-code-compiler.p.rapidapi.com/v1/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.setRequestHeader('X-RapidAPI-Key', '79090012c5msh3852509e6840b87p12efbfjsn1b1eb828a8d3');
  xhr.setRequestHeader('X-RapidAPI-Host', 'online-code-compiler.p.rapidapi.com');
  
  xhr.send(data);
}

function processQuestion(){
  // var data = document.getElementById('question').value;
  // Get the HTML contents of the currently active editor
  var data = tinyMCE.activeEditor.getContent();
  const element = document.getElementById("content");
  element.innerHTML += data
}