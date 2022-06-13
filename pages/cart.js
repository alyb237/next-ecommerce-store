import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getSynths } from '../util/database';

const mainDiv = css`
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom right, #e3f0ff, #fafcff);
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const contentMain = css`
  display: flex;
  width: 80%;
  height: 95%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 25px 40px #1687d933;
`;

const cartTitle = css`
  display: flex;
  justify-content: flex-start;
`;

const productInfo = css`
  display: flex;
  width: 130%;
  height: 60%;
  justify-content: space-between;
  align-items: center;
  padding: 4px;

  .synthName {
    width: 150px;
    font-weight: 800;
    color: #202020;
  }

  .synthBrand {
    font-weight: 600;
    color: #909090;
  }

  .synthQuantity {
    width: 50px;
    justify-content: flex-start;
  }
`;
const quantityButton = css`
  outline: 0;
  grid-gap: 8px;
  align-items: center;
  background: 0 0;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 8px;
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
// const quantityButtonParent = css`
//   display: flex;
//   justify-items: flex-end;
// `;
const synthImage = css`
  width: 15%;
  text-align: center;
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
  flex-shrink: 0;
  font-size: 16px;
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

const quantityNumStyles = css`
  padding: 10px;
`;
const sumStyle = css`
  display: flex;
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
    console.log(`first total: ${accumulator}`);
    console.log(`next total: ${a}`);
    // first total: 2000
    // next total: 4200
    return accumulator + a;
  }

  // adding total price values in array by reducing down to one sum
  // begins adding from first total price with 0
  const sum = totalPrice.reduce(add, 0);
  console.log('here is the sum', sum);
  // after reduce : here is the sum 6200

  // route checkout button to checkout page
  const router = useRouter();
  // const handleRoute = (event) => {
  //   event.preventDefault();

  // };

  return (
    <div css={mainDiv}>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3 css={cartTitle}>Shopping Cart</h3>
      <div css={contentMain}>
        {synthCart.length === 0 ? (
          <h1>Cart is empty!</h1>
        ) : (
          <div>
            {synthCart.map((synth) => {
              const synthPrice = Number(synth.price);
              const synthCounter = Number(synth.quantity);
              const synthPriceTotal = synthPrice * synthCounter;
              return (
                <div key={`synthCart-${synth.id}`}>
                  <div css={productInfo}>
                    <Link href={`/synths/${synth.id}`}>
                      <div css={synthImage}>
                        <img
                          src={`/${synth.id}.jpg`}
                          alt="synth"
                          width="110"
                          cursor="default"
                        />
                      </div>
                    </Link>
                    <div className="synthName">
                      <p>{synth.brand}</p>
                    </div>
                    <div className="synthName">
                      <p>{synth.name}</p>
                    </div>
                    {/* <div className="synthName">
                      <p className="synthQuantity">{synth.quantity}</p>
                    </div> */}

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
                      <span>{synth.quantity}</span>
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
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          router.push('/checkout').catch(() => {});
        }}
      >
        Checkout
      </button>
      <br />
      <p css={sumStyle}>sum : {sum}</p>
    </div>
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
