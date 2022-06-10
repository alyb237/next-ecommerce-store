import { css } from '@emotion/react';
import Link from 'next/link';

// import { Layout } from '../pages/cart';

const headerMainStyles = css`
  display: flex;
  background: lightgrey;
  justify-content: space-around;
`;

const headerStyles = css`
  width: 600px;
  display: flex;
  padding: 8px 12px;
  border-radius: 4px;

  justify-content: space-evenly;

  > div > a {
    margin-left: 10px;
    text-decoration: none;
  }
`;

const links = css`
  display: flex;
  align-content: flex-start;
`;

// const footerStyles = css`
//   padding: 8px 12px;
//   margin-top: 0px;
//   background: lightgrey;
//   border-radius: 4px;
//   display: flex;
//   align-items: space-between;
//   justify-content: center;
// `;

// const footerDivStyles = css`
//   display: flex;
//   min-height: 20vh;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const footerContainer = css`
//   margin-top: auto;
// `;

export default function Header(props) {
  // console.log('items before reduce', props.itemsInCookieCart);
  const totalItemsInCart = props.itemsInCookieCart.reduce(function (
    acc,
    current,
  ) {
    return acc + current.quantity;
  },
  0);
  console.log('header', props.itemsInCookieCart);
  console.log('total items in cart', totalItemsInCart);
  return (
    <div css={headerMainStyles}>
      <header data-test-id="products-link" css={headerStyles}>
        <div css={links}>
          <Link href="/">Home</Link>
          <br />
          <Link href="/synths">Synths</Link>
        </div>
        <div>
          <Link href="/cart" data-test-id="cart-link">
            <div className="cartStyle" data-test-id="cart-counter">
              Cart 🛒 {totalItemsInCart}
            </div>
          </Link>
        </div>
      </header>
      {/* <div css={footerDivStyles}>
        <div css={footerContainer}>
          <footer css={footerStyles}>Footer</footer>
        </div>
      </div> */}
    </div>
  );
}
