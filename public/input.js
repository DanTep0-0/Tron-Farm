// window.onload = function(){
//     document.body.scrollTop = 0;
// }

// function storePagePosition() {
//   var page_y = window.pageYOffset;
//   localStorage.setItem("page_y", page_y);
// }
// window.addEventListener("scroll", storePagePosition);
// var currentPageY;
// try {
//   currentPageY = localStorage.getItem("page_y");
//   if (currentPageY === undefined) {
//     localStorage.setItem("page_y") = 0;
//   }
//   window.scrollTo( 0, currentPageY );
// } catch (e) {
//     // no localStorage available
// }



//------------------TOOLTIP APPEARANCE AND CHANGING-----------------
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

//---------------------COPYING-------------------
document.getElementById('button').addEventListener('click', function(){
  copyFunction("tron.farm@gmail.com")
})

//---------------------COUNT UP-------------------

// var currentNumber = $('.number').text();
// $({numberValue: currentNumber}).animate({numberValue: 2000}, {
//     duration: 2000,
//     easing: 'linear',
//     step: function() {
//         $('.number').text(Math.ceil(this.numberValue));
//     }
// });
