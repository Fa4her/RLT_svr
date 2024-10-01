let http = require("http");
let fs = require("fs");
let socket_io = require("socket.io");

let oshagiri_index = 0;

let server = http.createServer((req, res)=>{
  if (req.url==="/"){
    let a = 0;
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(fs.readFileSync("./index.html"));
  } else if (req.url==="/send_location.js"){
    res.writeHead(200, {"Content-Type": "text/javascript"});
    res.end(fs.readFileSync("./send_location.js"));
  }
}).listen(process.env.PORT || 8000); 

let io = socket_io(server);


io.sockets.on("connection", (socket)=>{

  socket.on("send-location", (data)=>{
    let index = data["index"];
    let coord = data["coord"];
    fs.writeFileSync(`/coord/coord-${index}.json`, coord);
  });

  socket.on("need-index", (_)=>{
    socket.emit("need-index", oshagiri_index);
    oshagiri_index++;
  });
});