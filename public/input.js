function copyFunction() {
  var copyText = document.getElementById("emailAdress");
  copyText.select();
  document.execCommand("copy");

  var toolTip = document.getElementById("myToolTip");
  toolTip.innerHTML = "Copied!";
  // var timer = setTimeout(,2000);
  // clearTimeout(timer);
}

function outFunction() {
  var toolTip = document.getElementById("myToolTip");
  toolTip.innerHTML = "Copy email adress";
}



  // var menu = document.getElementById('menu');
  // var button = menu.querySelector('.menuButton');
  //
  // button.onclick = function() {
  //   menu.classList.toggle('open');
  // };
