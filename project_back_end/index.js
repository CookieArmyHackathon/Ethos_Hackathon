const express = require("express");
const { spawn } = require("child_process");
const scrapy = require("node-scrapy");
const fetch = require("node-fetch");
const mysql = require("./connection").con;
const cors = require('cors');
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
const port = 3300;
const modifySearchParamter = (searchParameter) => {
  var separatedArray = searchParameter.split(" ");
  return separatedArray.join("%20");
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
  fetch(url)
    .then((res) => res.text())
    .then((body) => {
      res.send(scrapy.extract(body,model).news_articles[0].news_title)
    });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
