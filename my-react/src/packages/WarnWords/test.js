import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const path = require('path');
// const myHttp = require('http');
// const fs = require('fs');

const app = express()
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
app.use(express.static(__dirname))
// const server = myHttp.createServer ((req, res) => {
//   const filePath = 'C:/Users/17740/Desktop/Task.docx';
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       res.end('error');
//     } else {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write(data);
//       return res.end();
//     }
//   });
// })

const pathForSave = "d:/newshucai/suipian/my-react/src/packages/WarnWords";

app.post("/track", function (req, res) {
  console.log(req, res, 'req res');
    var updateFile = function (response, body, path) {
        if (body.status == 2)
        {
            var file = syncRequest("GET", body.url);
            fs.writeFileSync(path, file.getBody());
        }

        response.write("{\"error\":0}");
        response.end();
    }

    var readbody = function (request, response, path) {
        var content = "";
        request.on("data", function (data) {
            content += data;
        });
        request.on("end", function () {
            var body = JSON.parse(content);
            updateFile(response, body, path);
        });
    }

    if (req.body.hasOwnProperty("status")) {
        updateFile(res, req.body, pathForSave);
    } else {
        readbody(req, res, pathForSave)
    }
});

app.listen(8090, '172.28.100.230', () => {
  console.log('Running at localhost');
});
