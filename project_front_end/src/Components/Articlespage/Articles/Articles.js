import { React, useEffect, useState } from "react";
import "./Articles.css";
const Articles = (props) => {
  return (
    <>
      <div className="Article">
        <div class="scroll-img-item">
          <div class="scroll-img-texts">
            <a href={props.newsLink} target="__blank" style={{textDecoration:"none"}}>
            <p class="scroll-img-title">
              {props.title}
            </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Articles;
