var ws = require("nodejs-websocket")


var PORT = 3017;

var count = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    count++
    conn.nickname = "user" + count
   // 消息对象
    let mes = {}
    mes.type = "enter"
    mes.data =  conn.nickname+"加入进来了"
    sendAll(JSON.stringify(mes));

	conn.on("text", function (str) {
        let m = JSON.parse(str);
        let mes1 = {};
        mes1.type  = m.type;
        console.log(mes1.type);
        if(mes1.type == "NMtext"){
            mes1.data = m.str;
        }else if(mes1.type == "text"){
            mes1.data = conn.nickname +": "+ m.str;
        } else if(mes1.type =="img"){
            mes1.data = m.str;
            mes1.user = conn.nickname;
        }
        sendAll(JSON.stringify(mes1));   
    })
    
	conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes = {}
        mes.type = "leave"
        mes.data =  conn.nickname+"离开了"
        sendAll(JSON.stringify(mes));
    })
    conn.on("error",function(err){
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT) 

console.log("监听端口号"+PORT)




function sendAll(str){
    server.connections.forEach(function(connection){
        connection.sendText(str)
    })
}