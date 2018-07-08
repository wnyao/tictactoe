import React from "react";
import GithubIcon from "../res/images/github_icon.png";

const Footer = props => (
  <div className="footer">
    <ImageLink href="https://github.com/wnyao" src={GithubIcon} />
  </div>
);

const ImageLink = props => (
  <div>
    <a href={props.href}>
      <img src={props.src} width="24" height="24" />
    </a>
  </div>
);

export default Footer;
