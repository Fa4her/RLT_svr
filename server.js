let http = require("http");
let fs = require("fs");
let socket_io = require("socket.io");

let oshagiri_index = 0;

let server = http.createServer((req, res)=>{
  if (req.url==="/"){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(fs.readFileSync("./index.html"));
  }
}).listen(8000 || process.env.PORT); 

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