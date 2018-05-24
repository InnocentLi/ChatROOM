function init(){


var PORT = 3017;





var img_upload=document.getElementById("img_upload");
var scen = document.getElementById("x");

function showMS(str, type,users) {
    console.log(str,type);
    var div = document.createElement('div');
    if(type=="img"){
      scen.innerHTML += '<p style="margin:1px;">'+users+'</p>';
      scen.innerHTML += '<img src="'+str+'" alt=""/ style="width:150px;">'; 
    }else{
    div.innerHTML = str;
    localStorage.text += str+"<br>" ;
    if (type == "enter") {
       // div.style.color = "blue";
       scen.innerHTML += '<div  style="margin:1px;color:blue;">'+str+'</div>';
    } else if (type == "leave") {
        scen.innerHTML += '<div  style="margin:1px;color:red;">'+str+'</div>';
      //  div.style.color = "red";
    } else if(type =="text"){
        scen.innerHTML += '<div  style="margin:1px;">'+str+'</div>';
       // div.style.color = "black";
    } else if(type=="NMtext"){
        scen.innerHTML += '<div  style="margin:1px;color:pink;">'+str+'</div>';
        //div.style.color = "pink";
    }
    }
    //var mes = document.getElementById("iphone-screen");
    //mes.appendChild(div);
    $('#iphone-screen').scrollTop( $('#iphone-screen')[0].scrollHeight);
}


var rea = document.getElementById("rea");
rea.onclick = function(event){
    var target = event.target;
    document.getElementById("sendTxt").value = target.innerText;
  }
  
  

// var websocket = new WebSocket("ws://echo.websocket.org/");
var websocket = new WebSocket("ws://localhost:" + PORT + "/");
websocket.onopen = function () {
    var emoji = document.getElementById("emoji");
function send(typed,strd){
   
    
    var m ={};
    m.type = typed;
    m.str = strd;       
    websocket.send(JSON.stringify(m));
    console.log(m.type);
}

  emoji.onclick = function(event){
    var target = event.target;
    send("text",target.innerText);
  }

 document.getElementById("sendBtn").onclick = function () {
    var txt = document.getElementById("sendTxt").value;
    
    send("text",txt);
    document.getElementById("sendTxt").value ="";
 };
 document.getElementById("sendNMBtn").onclick = function(){
    var txt = document.getElementById("sendTxt").value;
    send("NMtext",txt);
    document.getElementById("sendTxt").value ="";
 };
 img_upload.addEventListener('change',readFile,false);

     
 function readFile(){
    var file=this.files[0];
    if(!/image\/\w+/.test(file.type)){ 
        alert("请确保文件为图像类型"); 
        return false; 
    }
    var reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=function(){
        send("img",this.result);
    }
   
  }
 

    document.getElementById("recv").innerHTML = "Connected";
}
websocket.onclose = function () {
    websocket.log("websocket.close");
}
websocket.onmessage = function (e) {
    console.log(e.data);
    var mes = JSON.parse(e.data);
    showMS(mes.data, mes.type,mes.user);
}







}