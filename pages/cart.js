import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getSynths } from '../util/database';

const contentMain = css``;
const productInfo = css`
  display: flex;
  border: 1px solid;
  justify-content: space-evenly;
  align-items: center;
`;
const quantityButton = css``;
const quantityButtonParent = css``;
const synthInCartParent = css``;
const synthImage = css``;
const itemName = css``;
const itemBrand = css``;
const itemTotal = css``;
const itemPrice = css``;
const deleteButton = css``;

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

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      sum : {sum}
      <div css={contentMain}>
        {synthCart.length === 0 ? (
          <h1>Cart is empty!</h1>
        ) : (
          <div css={synthInCartParent}>
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
                          width="225"
                          cursor="default"
                        />
                      </div>
                    </Link>
                    <p css={itemName}>{synth.name}</p>
                    <p css={itemBrand}>{synth.brand}</p>
                    <p css={itemPrice}>{synth.quantity}</p>
                    <p css={itemTotal}>{synthPriceTotal}</p>

                    <div css={quantityButtonParent}>
                      <button
                        css={quantityButton}
                        onClick={() => {
                          const newQuantity =
                            synth.quantity > 1 ? synth.quantity - 1 : 1;

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
                          currentSynth.quantity > 1
                            ? (currentSynth.quantity -= 1)
                            : (currentSynth.quantity = 1);

                          // 4. set the new cookie
                          setStringifiedCookie('cart', currentCart);
                        }}
                      >
                        -
                      </button>
                      <span>{synth.quantity}</span>
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
                        }}
                      >
                        +
                      </button>

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
                          setStringifiedCookie('cart', updatedCart);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  // console.log('checking what is in cookie cart', currentCart);

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
  return {
    props: {
      foundSynths: foundSynths,
    },
  };
}
