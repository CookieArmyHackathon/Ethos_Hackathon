import {React,useEffect} from "react";
import Graph from "./Graphs/Graph";
import "./Analysispage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Webheading from "../WebPageHeading/Webheading";
import axios from "axios"

const Analysispage = () => {
  const handleClick=()=>{
    axios.get("http://127.0.0.1:3300/getArticles",
    ).then(res=>{
      navigate("/articles",{state:res.data})
    })
  }
  const navigate = useNavigate();
  return (
    <div className="analysis-page">
      <div class="webheading">
        <Webheading />
      </div>
      <div className="analysis-page-container">
        <div className="Graph-analysis-page">
          <Graph />
        </div>
        <div className="final-analysis-para">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            error est possimus debitis? Numquam, quo, iure facilis voluptatem
            cupiditate cum et, nobis aliquid ipsa voluptatum sed consequatur ex
            nulla. Rem?
          </p>
        </div>
        <div className="fetched-articles-button">
          
            <button onClick={()=>{
              handleClick()
            }}>View Articles</button>
        </div>
      </div>
    </div>
  );
};

export default Analysispage;
