const express = require("express");
const { spawn } = require("child_process");
const scrapy = require("node-scrapy");
const fetch = require("node-fetch");
const mysql = require("./connection").con;
const cors = require("cors");
const axios = require("axios");
const { resolveSoa } = require("dns/promises");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const port = 3300;
const modifySearchParamter = (searchParameter, delimeter) => {
  var separatedArray = searchParameter.split(" ");
  return separatedArray.join(delimeter);
};
var data;
const scrapeData = (searchParameter, url, model, page_number = 1) => {
  fetch(url)
    .then((res) => res.text())
    .then((body) => {
      const content = scrapy.extract(body, model);
      let qry1 = `delete from newsarticles where NewsSearchParameter!='${searchParameter}'`;
      mysql.query(qry1, (err, result) => {
        if (err) {
          return err;
        }
      });
      content.news_articles.map((article) => {
        let new_article_news_title = null;
        if (article.news_title !== null) {
          new_article_news_title = article.news_title.replaceAll(`'`, ``);
        }
        let qry = `insert into newsarticles values (0,'${searchParameter}','${new_article_news_title}','${article.news_link}','${article.news_imageLink}')`;
        mysql.query(qry, (err, result) => {
          if (err) {
            return err;
          }
        });
      });
    });
  return data;
};
app.post("/", (req, res) => {
  const { searchParameter } = req.body;
  const modifiedSearchParameter_google = modifySearchParamter(
    searchParameter,
    "%20"
  );
  const modifiedSearchParameter_bbc = modifySearchParamter(
    searchParameter,
    "+"
  );
  const url_google_news = `https://news.google.com/search?q=${modifiedSearchParameter_google}&hl=en-IN&gl=IN&ceid=IN%3Aen`;
  const url_bbc_news = `https://www.bbc.co.uk/search?q=${modifiedSearchParameter_bbc}&d=news_gnl&page=`;
  const model_google = {
    news_articles: [
      ".NiLAwe",
      {
        news_title: ".xrnccd article .ipQwMb .DY5T1d",
        news_link: ".xrnccd article .ipQwMb .DY5T1d (href)",
        news_imageLink: "a figure img (src)",
      },
    ],
  };
  const model_bbc = {
    news_articles: [
      ".ett16tt0",
      {
        news_title: ".e3z3r3u0 .e1f5wbog7 .e1y4nx260 .eq5iqo00",
        news_link: ".e3z3r3u0 .e1f5wbog7 .e1y4nx260 a (href)",
        news_imageLink:
          ".e3z3r3u0 .ehnfhlg4 .ehnfhlg2 .ehnfhlg3 .e16icw910  img (src)",
      },
    ], 
  };
  let a = scrapeData(searchParameter, url_google_news, model_google);
  for (let page_number_bbc = 1; page_number_bbc < 21; page_number_bbc++) {
    scrapeData(
      searchParameter,
      url_bbc_news.concat(page_number_bbc),
      model_bbc,
      page_number_bbc
    );
  }
  res.send("complete")
});
app.get("/getArticles", (req, res) => {
  let qry = `select * from newsarticles`;
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
