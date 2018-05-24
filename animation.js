
var sleep  = document.getElementsByClassName("sleep")[0];
var logo = document.getElementById("applelogo");
var h1 = document.getElementById("header");
sleep.onclick = function(){
    logo.style.display = "block";
    setTimeout(OpenPhone,5000);
}

function OpenPhone(){
    h1.style.display = "block"
    logo.style.display = "none";
    init();
}

$(document).ready(function(){
    $('#iphone-screen').scrollTop( $('#iphone-screen')[0].scrollHeight);
    $('#iphone-screen').scrollLeft( $('#iphone-screen')[0].scrollWidth);
 });