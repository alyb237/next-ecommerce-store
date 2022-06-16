import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getSynths } from '../util/database';

const mainSection = css`
  margin: 0;
  padding: 0;
  /* margin-bottom: 20%; */
  padding-top: 2%;
  background: linear-gradient(to bottom right, #dbedf8, #ebdbf8);
  height: 100vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;

  .titleStyle {
    // display: flex;
    /* height: 5vh; */
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;

const contentMain = css`
  display: flex;
  width: 70%;
  /* height: 75%; */
  /* margin: 50px; */
  background-color: #f3e6e8;
  background-image: linear-gradient(315deg, #f3e6e8 0%, #d5d0e5 74%);
  border-radius: 20px;
  box-shadow: 0px 25px 40px #dbedf8;

  .hr {
    &:before,
    &:after {
      height: 6px;
      filter: blur(5px);
      border-radius: 5px;
    }

    &:before {
      background: linear-gradient(to right, blue, pink);
    }

    &:after {
      background: linear-gradient(to left, blue, pink);
    }
  }

  .columnsDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10%;
    padding: 20px;
  }

  .productInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
  }
  .imgDiv {
    width: 15%;
  }

  .imgBorder {
    border: 2px solid #fce9fa;
    border-radius: 4px;
  }

  .synthName {
    width: 50px;
    font-weight: 800;
    color: #202020;
  }

  .synthBrand {
    font-weight: 600;
    color: #909090;
  }

  .synthPrice {
    width: 50px;
    justify-content: flex-start;
  }

  .emptyCartStyle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

const quantityButton = css`
  outline: 0;
  grid-gap: 8px;
  align-items: center;
  background: #e7e7e7;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 12px;
  gap: 8px;
  justify-content: center;
  line-height: 1.5;
  overflow: hidden;
  padding: 6px 8px;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: all 0.14s ease-out;
  white-space: nowrap;
  :hover {
    box-shadow: 4px 4px 0 #000;
    transform: translate(-4px, -4px);
  }
  :focus-visible {
    outline-offset: 1px;
  }
`;

const deleteButton = css`
  padding: 50px;
  outline: 0;
  grid-gap: 8px;
  align-items: center;
  background-color: #fa2492;
  color: #000;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
  gap: 8px;
  justify-content: center;
  line-height: 1.5;
  overflow: hidden;
  padding: 8px 12px;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: all 0.14s ease-out;
  white-space: nowrap;
  :hover {
    box-shadow: 4px 4px 0 #000;
    transform: translate(-4px, -4px);
  }
  :focus-visible {
    outline-offset: 1px;
  }
`;
const checkoutButtonStyles = css`
  outline: 0;
  grid-gap: 8px;
  align-items: center;
  background-color: #f7fe8f;
  color: #000;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: bold;
  width: 15%;
  gap: 8px;
  justify-content: center;

  line-height: 1.5;
  overflow: hidden;
  padding: 12px 16px;
  text-decoration: none;
  text-overflow: ellipsis;
  transition: all 0.14s ease-out;
  white-space: nowrap;
  :hover {
    box-shadow: 4px 4px 0 #000;
    transform: translate(-4px, -4px);
  }
  :focus-visible {
    outline-offset: 1px;
  }
`;

const checkoutButtonDiv = css`
  display: flex;
  justify-content: flex-end;
`;

const quantityNumStyles = css`
  padding: 10px;
`;
const sumStyle = css`
  display: flex;
  justify-content: flex-end;
  font-weight: 900;
  margin-top: 10px;
`;

export default function Cart(props) {
  // create a state to update the state of the quantities when + - is clicked
  const [synthCart, setSynthCart] = useState(props.foundSynths);

  // maps through the array of objects brought in through the props
  // extract the price and quantity information from foundSynths object - converts it to a Number
  // multiply and return a total price
  const totalPrice = synthCart.map((synth) => {
    const synthPrice = Number(synth.price);
    const synthCounter = Number(synth.quantity);
    const synthPriceTotal = synthPrice * synthCounter;
    return synthPriceTotal;
  });

  // const totalQuantity = Number(props.quantity);
  // console.log(totalQuantity);

  // create add function to add total of one synth to total of the next synth to get a sum
  function add(accumulator, a) {
    // console.log(`first total: ${accumulator}`);
    // console.log(`next total: ${a}`);
    // first total: 2000
    // next total: 4200
    return accumulator + a;
  }

  // adding total price values in array by reducing down to one sum
  // begins adding from first total price with 0
  const sum = totalPrice.reduce(add, 0);
  // console.log('here is the sum', sum);
  // after reduce : here is the sum 6200

  // route checkout button to checkout page
  const router = useRouter();
  // const handleRoute = (event) => {
  //   event.preventDefault();

  // };

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section css={mainSection}>
        <div className="titleStyle">
          <h3 style={{ padding: 0, marginTop: 0 }}>Shopping Cart</h3>
        </div>
        <div css={contentMain}>
          {synthCart.length === 0 ? (
            <h1 className="emptyCartStyle">Cart is empty!</h1>
          ) : (
            <div className="columnsDiv">
              {synthCart.map((synth) => {
                const synthPrice = Number(synth.price);
                const synthCounter = Number(synth.quantity);
                const synthPriceTotal = synthPrice * synthCounter;
                console.log('price total in cart', synthPriceTotal);
                return (
                  <div className="productInfo" key={`synthCart-${synth.id}`}>
                    <Link href={`/synths/${synth.id}`}>
                      <div className="imageDiv">
                        <img
                          src={`/${synth.id}.jpg`}
                          alt="synth"
                          width="110"
                          cursor="default"
                          className="imgBorder"
                        />
                      </div>
                    </Link>
                    <div className="synthName">
                      <p>{synth.brand}</p>
                    </div>
                    <div className="synthName">
                      <p>{synth.name}</p>
                    </div>
                    <div className="synthName">
                      <p className="synthPrice">€{synth.price}</p>
                    </div>

                    <button
                      css={quantityButton}
                      onClick={() => {
                        // console.log(synth);
                        const newQuantity =
                          synth.quantity > 1 ? synth.quantity - 1 : 1;

                        const updatedArray = synthCart.map((total) =>
                          total.id === synth.id
                            ? { ...total, quantity: newQuantity }
                            : total,
                        );
                        // console.log('updatedArray: ', updatedArray);
                        setSynthCart(updatedArray);
                        // 1. get the cookie
                        const currentCart = getParsedCookie('cart');

                        // 2. get the synth
                        const currentSynth = currentCart.find(
                          (synthInCart) => synth.id === synthInCart.id,
                        );
                        // 3. update the quantity of synths
                        currentSynth.quantity > 1
                          ? (currentSynth.quantity -= 1)
                          : (currentSynth.quantity = 1);

                        // 4. set the new cookie
                        setStringifiedCookie('cart', currentCart);
                        props.setItemsInCookieCart(updatedArray);
                      }}
                    >
                      -
                    </button>
                    <div css={quantityNumStyles}>
                      <span data-test-id={`cart-product-quantity-${synth.id}`}>
                        {synth.quantity}
                      </span>
                    </div>
                    <button
                      css={quantityButton}
                      onClick={() => {
                        const newQuantity = synth.quantity + 1;

                        const updatedArray = synthCart.map((total) =>
                          total.id === synth.id
                            ? { ...total, quantity: newQuantity }
                            : total,
                        );
                        setSynthCart(updatedArray);
                        // 1. get the cookie
                        const currentCart = getParsedCookie('cart');
                        // 2. get the synth
                        const currentSynth = currentCart.find(
                          (synthInCart) => synth.id === synthInCart.id,
                        );
                        // 3. update the quantity of synths
                        currentSynth.quantity += 1;

                        // 4. set the new cookie
                        setStringifiedCookie('cart', currentCart);
                        props.setItemsInCookieCart(updatedArray);
                      }}
                    >
                      +
                    </button>
                    <br />
                    <br />
                    <button
                      data-test-id={`cart-product-remove-${synth.id}`}
                      css={deleteButton}
                      onClick={() => {
                        synth.quantity = 0;

                        const updateArray = synthCart.filter(
                          (synthRemove) => synthRemove.quantity !== 0,
                        );
                        // 1. update the sate
                        setSynthCart(updateArray);
                        // 2. cookies begin
                        const currentCart = getParsedCookie('cart');
                        // 3. get the synth from the cookies
                        const currentSynth = currentCart.find(
                          (synthInCart) => synth.id === synthInCart.id,
                        );
                        // 4. update the quantity to 0
                        currentSynth.quantity = 0;
                        // 5. create new cart
                        const updatedCart = currentCart.filter(
                          (currentSynthInCart) =>
                            currentSynthInCart.quantity !== 0,
                        );
                        // 6. set the new cookie update after deleting
                        props.setItemsInCookieCart(updatedCart);
                        setStringifiedCookie('cart', updatedCart);
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              })}
              <br />
              <hr size="2px" width="100%" color="#B1B1AD" />
              <div css={sumStyle}>
                <p data-test-id="cart-total">Total: €{sum}</p>
              </div>
              <div css={checkoutButtonDiv}>
                <button
                  css={checkoutButtonStyles}
                  data-test-id="cart-checkout"
                  onClick={() => {
                    router.push('/checkout').catch(() => {});
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  console.log('checking what is in cookie cart', currentCart);

  // 2. get the object from the cookies in the database

  const allSynths = await getSynths();
  // const singleSynth = allSynths.filter((synth) => {
  //        return allSynths.id = currentCart.[synth].id;
  // });
  // create array to store found synths in cookies
  const foundSynths = [];

  // 3. query synth database to find the id of current cart item
  for (const synth of currentCart) {
    const synthData = allSynths.find((synthItem) => {
      return synthItem.id === synth.id;
    });

    if (!synthData) {
      context.res.statusCode = 404;
    }

    // 4. create a new object adding the properties from the cookie object to the synth in the database
    const superSynth = { ...synthData, ...synth };

    // add to array
    foundSynths.push(superSynth);
  }
  console.log(foundSynths);
  return {
    props: {
      foundSynths: foundSynths,
    },
  };
}

// export function Header(props) {
//   // count the items inside of the array

//   const cartCounter = props.synthCart.reduce((acc, item) => {
//     return acc + item.cartCounter;
//   }, 0);
//   return <nav>{cartCounter}</nav>;
// }
