import { React, useEffect, useState } from "react";
import Webheading from "../WebPageHeading/Webheading";
import Articles from "./Articles/Articles";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Articlespage = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("location.state", location.state[0].NewsHeading);
  }, []);

  return (
    <div>
      <Webheading />
      {location.state.map((article) => {
       return <Articles title={article.NewsHeading} newsLink={article.NewsLink}/>
      })}
    </div>
  );
};

export default Articlespage;
