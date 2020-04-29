import React from "react";

export default function Footer() {
  return (
    <footer className="site__footer light-blue accent-4">
      <a
        href="https://cpustejovsky.com/"
        target="_blank"
        rel="noreferrer noopener"
        className="grey-text text-lighten-3"
      >
        Cpustejovsky <i className="far fa-thumbs-up"></i>,{" "}
        {new Date().getFullYear()}
      </a>
      <span>
        <a
          className="site__footer__icon grey-text text-lighten-3"
          href="https://github.com/cpustejovsky/estuary"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          className="site__footer__icon grey-text text-lighten-3"
          href="https://twitter.com/CCPustejovsky"
          target="_blank"
          rel="noreferrer noopener"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </span>
    </footer>
  );
}