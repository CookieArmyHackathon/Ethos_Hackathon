const express = require("express");
const { spawn } = require("child_process");
const scrapy = require("node-scrapy");
const fetch = require("node-fetch");
const mysql = require("./connection").con;
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const port = 3300;
const modifySearchParamter = (searchParameter) => {
  var separatedArray = searchParameter.split(" ");
  return separatedArray.join("%20");
};
const scrapeData = (searchParameter,url,model) => {
  fetch(url)
    .then((res) => res.text())
    .then((body) => {
      const content = scrapy.extract(body, model);
      let qry1='delete from newsarticles';
      mysql.query(qry1,(err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          console.log("success deleting")
        }
      })
      content.news_articles.map((article) => {
        let qry = `insert into newsarticles values (0,'${searchParameter}','${article.news_title.replaceAll(`'`,``)}','${"https://news.google.com/"+article.news_link}','${article.news_imageLink}')`;
        mysql.query(qry, (err, result) => {
          if (err) {
            console.log(err)
            return
          } else {
            console.log("success")
          }
        });
      });
    });
};
app.post("/", (req, res) => {
  const { searchParameter } = req.body;
  const modifiedSearchParameter = modifySearchParamter(searchParameter);
  const url = `https://news.google.com/search?q=${modifiedSearchParameter}&hl=en-IN&gl=IN&ceid=IN%3Aen`;
  const model = {
    news_articles: [
      ".NiLAwe",
      {
        news_title: ".xrnccd article .ipQwMb .DY5T1d",
        news_link: ".xrnccd article .ipQwMb .DY5T1d (href)",
        news_imageLink: "a figure img (src)",
      },
    ],

  };
  scrapeData(searchParameter,url,model)
  res.send("complete");
});
app.post("/getArticles", (req, res) => {
  let qry = `select * from newsarticles where NewsSearchParameter='${req.body.searchParameter}'`;
  mysql.query(qry, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
