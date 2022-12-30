const express = require("express");
const { spawn } = require("child_process");
const app = express();
app.use(express.json());
const port = 3300;
app.post("/", (req, res) => {
  const { name } = req.body;
  var largeDataSet = [];
  const python = spawn("python", [
    "D:\\Ethos_Hackathon\\project_back_end\\ScrapeNewsSites\\spiders\\newsArticles.py",
    `${name}`,
  ]);
  console.log("it's working till here");
  try{
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    largeDataSet.push(data);
  });
  
  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    //  res.send(largeDataSet.join(""))
    res.send(largeDataSet.join(""));
  });}
  catch(err){ 
    res.send(err)
  }
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
