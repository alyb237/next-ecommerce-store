import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getParsedCookie } from '../util/cookies';

export default function MyApp({ Component, pageProps }) {
  // useEffect for header cart
  const [itemsInCookieCart, setItemsInCookieCart] = useState([]);

  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setItemsInCookieCart(currentCart);
  }, []);

  // console.log(itemsInCookieCart);

  // console.log('total cart ', itemsInCookieCart);
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
      <Layout
        itemsInCookieCart={itemsInCookieCart}
        setItemsInCookieCart={setItemsInCookieCart}
      >
        <Component
          {...pageProps}
          itemsInCookieCart={itemsInCookieCart}
          setItemsInCookieCart={setItemsInCookieCart}
        />
      </Layout>
    </>
  );
}
