import React from 'react';
import { string } from 'prop-types';
import GithubIcon from '../res/images/github_icon.png';

const ImageLink = props => (
  <div className={props.className}>
    <a href={props.href}>
      <img src={props.src} alt={props.alt} width="24" height="24" />
    </a>
  </div>
);

const Footer = props => (
  <footer className="footer">
    <ImageLink
      alt="GitHub Inc."
      className="footer__imagelink"
      href="https://github.com/wnyao/tic-tac-toe"
      src={GithubIcon}
    />
  </footer>
);

ImageLink.propTypes = {
  alt: string,
  className: string,
  href: string.isRequired,
  src: string.isRequired,
};

export { Footer, ImageLink };
