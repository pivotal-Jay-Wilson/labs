const express = require('express');
const app = express();
const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv(); 
const fs = require('fs');
const randomWords = require('random-words');
const wordSalad = randomWords({ exactly: 5, join: ' ' });
app.get('/', function (req, res) {
  let message;
  if (appEnv.app.space_name === "production"){
    message = "you are in the correct space";
  } else {
    message = "you are NOT in the correct space";
  }
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title>Node</title>
  </head>
  <body>
  
  <h1>Lab 1</h1>
  <p>You are deployed to ${appEnv.app.space_name}</p>
  <p>${message}</p>
  
  <h1>Lab 2</h1>
  <p>You set the memory to ${appEnv.app.limits.mem}</p>
  
  <h1>Lab 3</h1>
  <p>You set the disk size to ${appEnv.app.limits.disk}</p>
  
  <h1>Lab 4</h1>
  <p>Key file should look like:</p>
  <p>${wordSalad}<p>
  
  </body>
  </html>  
  `)
})
 
app.listen(appEnv.port, appEnv.bind, function() {
  fs.writeFile('security.key', wordSalad, function (err) {
    if (err) throw err;
  });
  console.log("server starting on " + appEnv.url)
});