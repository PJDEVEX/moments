// (5) Avatar component for the profile image
import React from "react";
import styles from "../styles/Avatar.module.css";

function Avatar({ src, height = 45, text }) {
  return (
    <span className={styles.Avatar}>
      <img src={src} height={height} alt="avatar" width={height} />
      {text}
    </span>
  );
}

export default Avatar;
