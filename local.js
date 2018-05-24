
var local = document.getElementById("Losee");

local.onclick = function (){
    console.log("local");
    var rea = document.getElementById("rea");
    rea.innerHTML = localStorage.text;
}

var Loclean = document.getElementById("Loclean");

Loclean.onclick  = function (){
    console.log("Loclean");
    localStorage.text ="";
}


var arr = ['Good','hellow','what?','sorry','It is none of mybusiness','ojbk','so?','OK','F**K'];
var input = document.getElementById("sendTxt");
var list = document.getElementById('rea');
input.onkeyup = function(e){
  var value = input.value;
  list.innerHTML = '';
  arr.forEach(function(word){
    var regex = new RegExp(`^[\s${input.value}]`);
    if(regex.test(word)){
      var li = document.createElement('li');
      li.innerText = word;
      list.appendChild(li);
    }
  });
};