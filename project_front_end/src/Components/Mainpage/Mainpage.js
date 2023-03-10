import { React, useState } from "react";
import "./Mainpage.css";
import { useNavigate } from "react-router-dom";
import Webheading from "../WebPageHeading/Webheading";
import axios from "axios";
const Mainpage = () => {
  const [searchParameter, setSearchParameter] = useState("");
  const navigate=useNavigate();
  const onSubmit = () => {
    axios.post("http://127.0.0.1:3300",{
      searchParameter:searchParameter
    }
    ).then(res=>{
      console.log(res);
      navigate("/analysis",{state:searchParameter});
    })
  };
  return (
    <div>
      <Webheading />
      <div class="about-us">
        <p>
          Heard of a name too much? Don’t know why that name is being talked
          about so much? Are you unable to state your opinions when your friends
          are talking about an entity? Trying to understand whether they are
          viewed in a positive light or not? We give you a tool that answers all
          your questions! Just type in the name you want to know about, and
          obtain all the stats about what sentiment our news channels attach to
          them. In case it seems dubious, check out the news articles published
          on them :)
        </p>
      </div>
      <div class="wrapper">
        <div class="searchBar">
          <input
            id="searchQueryInput"
            type="text"
            name="searchParameter"
            placeholder="Search"
            value={searchParameter}
            onChange={(e)=>{
              setSearchParameter(e.target.value)
              // console.log(searchParameter)
            }}
          />
          <button
            id="searchQuerySubmit"
            type="submit"
            name="searchQuerySubmit"
            onClick={() => {
              onSubmit();
            }}
          >
            <svg
              style={{
                width: "24px",
                height: "24px",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="#666666"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
