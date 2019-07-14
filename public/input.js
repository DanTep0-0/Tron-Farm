// function copyFunction() {
//   var copyText = document.getElementById("emailAdress");
//   copyText.select();
//   document.execCommand("copy");
//
//   var toolTip = document.getElementById("myToolTip");
//   toolTip.innerHTML = "Copied!";
// }

// $(document).ready(function () {
//
//     var show = true;
//     var countbox = ".benefits__inner";
//     $(window).on("scroll load resize", function () {
//         if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
//         var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
//         var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
//         var w_height = $(window).height(); // Высота окна браузера
//         var d_height = $(document).height(); // Высота всего документа
//         var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
//         if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
//             $('.benefits__number').css('opacity', '1');
//             $('.benefits__number').spincrement({
//                 thousandSeparator: "",
//                 duration: 1200
//             });
//
//             show = false;
//         }
//     });
//
// });

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
