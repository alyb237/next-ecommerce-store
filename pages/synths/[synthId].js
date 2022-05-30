// import { useRouter } from 'next/router';
// useRouter is slow its only good in the front end

import Cookies from 'js-cookie';
import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { synthsDatabase } from '../../util/database';

// [synthId] becomes the variable that will be accessible
export default function Synth(props) {
  // will always go to this page creates a dynamic route synths/600
  // if you want to run things only in the browser useEffect
  // useEffect(() => {
  //   window.localStorage.w = 1;
  // }, []);

  // if (!props.synth) {
  //   return <div>Item not listed</div>;
  // }
  const [isInCart, setIsInCart] = useState('isQuantity' in props.synth);
  const [isQuantity, setIsQuantity] = useState(props.synth.isQuantity || 0);

  return (
    <div>
      <h1>{props.synth.name}</h1>

      <div>
        <div>
          <Image src={`/${props.synth.id}.jpg`} width="600" height="298" />
        </div>
        <div>Brand: {props.synth.brand}</div>
        <div>Year: {props.synth.year}</div>
        <div>Price: {props.synth.price}</div>
        {/* this will show all synths {props.synthId} */}
        <div>
          <br />
          <button
            data-test-id="product-add-to-cart"
            onClick={() => {
              // 1. get the original array from the cookies
              const currentCart = Cookies.get('cart') // is cart defined?
                ? getParsedCookie('cart') // if true
                : []; // if false set to empty array
              let newCart;

              // if there is a product in the cart ???
              if (
                currentCart.find(
                  (synthInCart) => props.synth.id === synthInCart,
                )
              ) {
                newCart = currentCart.filter(
                  (synthInCart) => synthInCart.id !== props.synth.id,
                );
                setIsInCart(false);
                setIsQuantity(0);
              } else {
                // 2. add the value (spread operator)
                newCart = [
                  ...currentCart,
                  { id: props.synth.id, isQuantity: 0 },
                ];
                setIsInCart(true);
              }
              // 3. set the cookie to the new value
              setStringifiedCookie('cart', newCart);
            }}
          >
            {isInCart ? 'remove from cart' : 'add to cart'}
          </button>
          <br />
          {isInCart ? (
            <>
              {isQuantity}
              <button
                onClick={() => {
                  setIsQuantity(isQuantity + 1);
                  // 1. get the cookie
                  const currentCart = Cookies.get('cart')
                    ? getParsedCookie('cart')
                    : [];

                  //2. get the synth item
                  const currentSynthInCart = currentCart.find(
                    (synthInCart) => props.synth.id === synthInCart.id,
                  );
                  // 3. update the counter
                  currentSynthInCart.isQuantity += 1;
                  // 4. set the new cookie
                  setStringifiedCookie('cart', currentCart);
                }}
              >
                add one
              </button>
            </>
          ) : (
            ''
          )}

          {/*
          <label>
            Quantity
            <input data-test-id="product-quantity" type="number" min="1" />
          </label> */}
        </div>
      </div>
    </div>
  );
}

// if you want to run something only on the server
// context allows us
export function getServerSideProps(context) {
  // synthId comes from the url
  // const synthId = context.query.synthId;
  // const synths = synthsDatabase.find((synth) => {
  //   return synth.id === synthId;
  // });

  // if (!synths) {
  //   context.res.statusCode = 404;
  // }
  // 1. get the value of the cookie from the request object
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  // 2. get the id from the url and use it to the match the single synth id
  const singleSynth = synthsDatabase.find((synth) => {
    return synth.id === context.query.synthId;
  });

  // 3. find the object that represents the synth in the url
  const currentSynthInCart = currentCart.find(
    (synthInCart) => singleSynth.id === synthInCart.id,
  );

  // 4. create a new object adding the properties from the cookie object to the fruit in the database
  const newObjSynth = { ...singleSynth, ...currentSynthInCart };

  return {
    props: {
      synth: newObjSynth || null,
    },
  };
}
