import 'styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType<any>;
  };
};
function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <div>
      <Head>
        <title>Students Dashboard</title>
        <meta name="description" content="Welcome to Students Dashboard" />
        <link rel="icon" href="/pw-logo.png" />
      </Head>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}

export default MyApp;
