function copyFunction() {
  var copyText = document.getElementById("emailAdress");
  copyText.select();
  document.execCommand("copy");

  var toolTip = document.getElementById("myToolTip");
  toolTip.innerHTML = "Copied!";
}

function outFunction() {
  var toolTip = document.getElementById("myToolTip");
  toolTip.innerHTML = "Copy email adress";
}
