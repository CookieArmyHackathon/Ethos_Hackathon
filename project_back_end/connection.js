const mysql = require("mysql");
const con = mysql.createConnection({
  host: "towerblocks-db-sf-mainweb.cgmyyxrw9y9d.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "mainapi.Springfest23",
  database: "sql6584947",
  port: 3306,
});
con.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected");
  }
});
module.exports.con=con;