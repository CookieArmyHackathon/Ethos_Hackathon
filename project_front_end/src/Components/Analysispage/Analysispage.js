import React from "react";
import Graph from "./Graphs/Graph";
import "./Analysispage.css"
const Analysispage = () => {
  return (
    <div className="analysis-page-container">

      <div className="Graph-analysis-page">
        <Graph />
      </div>
      <div className="final-analysis-para">
        <p >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum error est possimus debitis? Numquam, quo, iure facilis voluptatem cupiditate cum et, nobis aliquid ipsa voluptatum sed consequatur ex nulla. Rem?
        </p>
      </div>
      <div className="fetched-articles-button">
        <button>
            View Articles
        </button>
      </div>
    </div>
  );
};

export default Analysispage;
