var x = "https://tronscan.org/#/contract/TXhSWnFWu91Qo4P6Lay5Bbd2q7inBBabVQ";
document.querySelector(".contract1").href = x;
document.querySelector(".contract2").href = x;
document.querySelector(".contract3").href = x;
document.querySelector(".contract4").href = x;

//--------------------TOOLTIP APPEARANCE-----------

var showingTooltip;

document.onmouseover = function(e) {
  // if(document.querySelector(".info").contains(".display-none")) {
  //   return;
  // }

  var target = e.target;

  var tooltip = target.getAttribute('data-tooltip');
  if (!tooltip) return;

  var tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = tooltip;
  document.body.appendChild(tooltipElem);

  var coords = target.getBoundingClientRect();

  var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 30; // не вылезать за левую границу окна

  var top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { // не вылезать за верхнюю границу окна
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  showingTooltip = tooltipElem;
};

document.onmouseout = function(e) {
  if (showingTooltip) {
    document.body.removeChild(showingTooltip);
    showingTooltip = null;
  }  };


  //--------------------COPY FUNCTION-----------------
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
  }
