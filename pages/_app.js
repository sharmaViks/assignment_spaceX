import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider } from '@material-ui/core/styles';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from './theme';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>SpaceX</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </React.Fragment>

  )
}

export default MyApp
