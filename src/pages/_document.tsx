import React from "react";
import { Head, Html, NextScript, Main } from "next/document";

const _document = () => {
  return (
    <Html>
      <Head />
      <body>
        <div id="overlay"></div>
        <div id="modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
