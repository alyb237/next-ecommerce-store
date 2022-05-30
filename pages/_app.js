import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Quicksand', sans-serif;
            background-color: #f9f3ec;
          }
        `}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
