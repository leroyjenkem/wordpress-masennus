import App from "next/app";
import Head from "next/head";
import { Suspense, createContext, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import * as jQuery  from "jquery";
import '../styles/styles.css';

// Store WordPress Global object in context
export const GlobalContext = createContext({});

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "TimesNewerRoman";
  src: url("styles/util/fonts/TimesNewerRoman-Regular.otf");
  font-style: bold;
  font-weight: 700;
  font-display: swap;
}
@font-face {
  font-family: "Quicksand";
  src: url("styles/util/fonts/Quicksand-VariableFont_wght.ttf");
}
@font-face {
  font-family: "RobotoMono";
  src: url("styles/util/fonts/RobotoMono-VariableFont_wght.ttf");
  font-style: lighter;
  font-weight: 200;
}
`;

const MyApp = ({ Component, pageProps }) => {
  const { page } = pageProps;
  
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="public/fonts/Quicksand-VariableFont_wght.ttf"
          as="font"
          type="font/woff"
          crossOrigin=""
          />
        <link
          rel="preload"
          href="public/fonts/RobotoMono-VariableFont_wght.ttf"
          as="font"
          type="font/woff"
          crossOrigin=""
          />
        <link
          rel="preload"
          href="public/fonts/TimesNewerRoman-Regular.otf"
          as="font"
          type="font/woff"
          crossOrigin=""
          />
      </Head>
      <Suspense fallback={<p>Loading</p>}/>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from WordPress
  // Pass the data to our page via props
  return { ...appProps };
};

export default MyApp;