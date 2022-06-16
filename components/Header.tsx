import { css } from '@emotion/react';
import Link from 'next/link';

// import { Layout } from '../pages/cart';

const headerMainStyles = css`
  display: flex;
  justify-content: space-between;
  background-color: #f3e6e8;
  background-image: linear-gradient(315deg, #f3e6e8 0%, #d5d0e5 74%);
  padding-top: 1px;
  flex-direction: column;
  color: black;
  ul {
    list-style: none;
    display: flex;
    color: black;
    justify-content: space-evenly;
    gap: 4px;
    text-decoration: none;
  }

  a {
    text-decoration: none;
    color: black;
  }

  .cartStyle {
    cursor: pointer;
  }
`;

// const headerStyles = css`
//   //width: 600px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-evenly;
//   padding: 10px 14px;
//   border-radius: 4px;

//   // justify-content: space-evenly;

//   > div > a {
//     margin-left: 10px;
//     text-decoration: none;
//     list-style-type: none;
//     color: black;
//   }
// `;

// Props is an Array of objects, therefore the "[]"
type Props = {
  itemsInCookieCart: {
    id: number;
    quantity: number;
  }[];
};

export default function Header(props: Props) {
  // console.log('items before reduce', props.itemsInCookieCart);
  const totalItemsInCart = props.itemsInCookieCart.reduce(function (
    acc: number,
    current: any,
  ) {
    return acc + current.quantity;
  },
  0);
  // console.log('header', props.itemsInCookieCart);
  // console.log('total items in cart', totalItemsInCart);
  return (
    <div css={headerMainStyles}>
      <header data-test-id="products-link">
        <ul>
          <Link href="/" text-decoration="none">
            Home
          </Link>
          <Link href="/synths" text-decoration="none">
            Synths
          </Link>

          <Link href="/cart" data-test-id="cart-link">
            <div className="cartStyle" data-test-id="cart-counter">
              Cart 🛒 {totalItemsInCart}
            </div>
          </Link>
        </ul>
      </header>
    </div>
  );
}
