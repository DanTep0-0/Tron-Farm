// function copyFunction() {
//   var copyText = document.getElementById("emailAdress");
//   copyText.select();
//   document.execCommand("copy");
//
//   var toolTip = document.getElementById("myToolTip");
//   toolTip.innerHTML = "Copied!";
// }

function copyFunction(text){
  var input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();

  try {
    var success = document.execCommand('copy');
    var msg = success ? 'successful!' : 'not successful';
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.error("Unable to copy", err);
  }
  document.body.removeChild(input);
  var toolTip = document.getElementById("myToolTip");
  toolTip.innerHTML = "Copied!";
}

function outFunction() {
  var toolTip = document.getElementById("myToolTip");
  toolTip.innerHTML = "Copy email adress";
}


document.getElementById('button').addEventListener('click', function(){
  copyFunction("tron.farm@gmail.com")
})
