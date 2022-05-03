import "./search.css";
import { PermMedia } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

export default function Share(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const description = useRef();
  const submitHandler = async (e) => {
    props.passChildData(description.current.value)
  };

  return (
    <div className="search">
      <div className="searchWrapper">
        <div className="shareTop">
          <input
            placeholder={`Search For Anything`}
            className="searchInput"
            ref={description}
          />
        <button className="shareButton" onClick={submitHandler}>
            Search
          </button>
        </div> 
      </div>
    </div>
  );
}
