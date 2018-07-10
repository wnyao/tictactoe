import React from "react";
import GithubIcon from "../res/images/github_icon.png";

const Footer = props => (
  <div className="footer">
    <ImageLink
      className="github-icon"
      href="https://github.com/wnyao/tic-tac-toe"
      src={GithubIcon}
      alt="Github Icon"
    />
  </div>
);

const ImageLink = props => (
  <div className={props.className}>
    <a href={props.href}>
      <img src={props.src} alt={props.alt} width="24" height="24" />
    </a>
  </div>
);

export { Footer, ImageLink };
