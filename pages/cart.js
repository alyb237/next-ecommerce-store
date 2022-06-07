import { css } from '@emotion/react';
import Head from 'next/head';
// import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
const itemQuantity = css``;
const itemPrice = css``;

export default function Cart(props) {
  const [calculate, setCalculate] = useState(props.foundSynths);

  const totalCounting = props.foundSynths.map((synth) => {
    const synthPrice = Number(synth.price);
    const synthCounter = Number(synth.synthCounter);
    const synthPriceTotal = synthPrice * synthCounter;
    return synthPriceTotal;
  });

  function add(accumulator, a) {
    return accumulator + a;
  }

  const sum = totalCounting.reduce(add, 0);

  useEffect(() => {
    setCalculate(sum);
  }, [sum]);

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={contentMain}>
        {calculate.length === 0 ? (
          <h1>Cart is empty!</h1>
        ) : (
          <div css={synthInCartParent}>
            {props.foundSynths.map((synth) => {
              return (
                <div key={`synthCart-${synth.id}`}>
                  <div css={productInfo}>
                    <Link href={`/synths/${synth.id}`}>
                      <div css={synthImage}>
                        <img src={`/${synth.id}.jpg`} alt="synth" width="225" />
                      </div>
                    </Link>
                    <p css={itemName}>{synth.name}</p>
                    <p css={itemBrand}>{synth.brand}</p>
                    <p css={itemQuantity}>{synth.quantity}</p>
                    <p css={itemPrice}>{synth.price}</p>

                    <div css={quantityButtonParent}>
                      <button
                        css={quantityButton}
                        onClick={() => {
                          const newQuantity =
                            synth.quantity > 1 ? synth.quantity - 1 : 1;

                          const updatedArray = props.foundSynths.map((total) =>
                            total.id === synth.id
                              ? { ...total, quantity: newQuantity }
                              : total,
                          );
                          setCalculate(updatedArray);

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
                          const updatedArray = props.foundSynths.map((total) =>
                            total.id === synth.id
                              ? { ...total, quantity: newQuantity }
                              : total,
                          );
                          setCalculate(updatedArray);
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
                    </div>
                  </div>
                </div>

                //  <div css={priceQuantityProductInfo}>
                //    <div css={buttons}>
                //       <button
                //         css={deleteButton}
                //         onClick={() => {
                //           synth.quantity = 0;
                //           const updateArray = props.foundSynths.filter((synth) => synth.quantity !==0 ,
                //           );
                //           // update the state
                //           setCalculate(updateArray);
                //           // cookies begin
                //           const currentCart = getParsedCookies('cart');
                //           // get the synth
                //           const currentSynth = currentCart.find((synthInCart) =>
                //           synth.id === synthInCart.id,
                //           );
                //           // update the counter
                //           currentSynth.quantity = 0;
                //           // create new cart
                //           const updatedCart = currentCart.filter((currentSynth) =>
                //           currentSynth.quantity !==0 ,
                //           );
                //           // set the new cookie
                //           setStringifiedCookie('cart', updatedCart);
                //         }}
                //         >
                //           Remove
                //         </button>
                //         <p>price</p>
                //         <p>total</p>
                //          </div>
                //   </div>
                //   </div>
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
  return {
    props: {
      foundSynths: foundSynths,
    },
  };
}
