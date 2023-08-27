import NoResults from "../assets/no-results.png";
import React from "react";
import styles from "../styles/NoFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return <div className={styles.NotFound}>
    <Asset 
    
    src = {NoResults}
    message= "Sorry, the page you're looking for doesn't exist"
    />
  </div>;
};

export default NotFound;
