// import { useRouter } from 'next/router';
// useRouter is slow its only good in the front end

import { css } from '@emotion/react';
// import { GetServerSidePropsContext } from 'next';
// import Cookies from 'js-cookie';
// import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getSynth } from '../../util/database';

// [synthId] becomes the variable that will be accessible

const productStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 100vh;
  background-color: #b8c6db;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);

  .imgStyles {
    display: flex;
    padding: 5px;

    .image {
      border-radius: 50px;
      border: 3px solid #fce9fa;
    }
  }
`;
const itemStyles = css`
  font-weight: bold;
`;

const textStyles = css`
  width: 450px;
`;

const addButtonStyles = css`
  outline: 0;
  grid-gap: 8px;
  align-items: center;
  background-color: #a474cf;
  color: #000;
  border: 1px solid #000;
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-size: 16px;
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

// const inputStyles = css`
//   border: 3px solid #000;
//   border-radius: 5px;
//   height: 50px;
//   line-height: normal;
//   color: #282828;
//   display: block;
//   width: 25%;
//   box-sizing: border-box;
//   user-select: auto;
//   font-size: 16px;
//   padding: 0 6px;
//   padding-left: 12px;
//   :focus {
//     border: 3px solid #5551ff;
//   }
// `;

const userInputStyles = css`
  display: flex;
  justify-content: space-evenly;
`;
const quantityButton = css``;

export default function Synth(props) {
  const [isQuantity, setIsQuantity] = useState(1);
  // console.log(isQuantity);

  if (!props.synth) {
    return <div>Item not listed</div>;
  }

  return (
    <div css={productStyles}>
      <h1>Synths!</h1>
      <div className="imgStyles">
        <img
          className="image"
          src={`/${props.synth.id}.jpg`}
          width="450"
          alt="synth pic"
          data-test-id="product-image"
        />
      </div>
      <div css={textStyles}>
        <div>
          <div css={itemStyles}>Brand: {props.synth.brand}</div>
          <div css={itemStyles}>Year: {props.synth.year}</div>
          <div data-test-id="product-price" css={itemStyles}>
            Price: {props.synth.price} €
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <br />
        <div css={userInputStyles}>
          <button
            data-test-id="product-quantity"
            type="button"
            css={quantityButton}
            onClick={() => {
              if (isQuantity > 1) {
                // cant be less than 1
                setIsQuantity((quantity) => quantity - 1);
              }
            }}
          >
            -
          </button>

          <span>{isQuantity}</span>

          <button
            data-test-id="product-quantity"
            type="button"
            css={quantityButton}
            onClick={() => {
              setIsQuantity(isQuantity + 1);
            }}
          >
            +
          </button>
          <br />
          <button
            data-test-id="product-add-to-cart"
            css={addButtonStyles}
            onClick={() => {
              const currentCart = getParsedCookie('cart')
                ? getParsedCookie('cart')
                : [];

              const currentSynthInCart = currentCart.find(
                (synthInCart) => props.synth.id === synthInCart.id,
              );

              if (currentSynthInCart) {
                currentSynthInCart.quantity =
                  Number(currentSynthInCart.quantity) + Number(isQuantity);

                // console.log('item is already in cart', quantity);
                console.log('carts now', currentCart);

                setStringifiedCookie('cart', currentCart);

                // This shows up on the browser don't put information you don't want changed
              } else {
                const newCart = [
                  ...currentCart,
                  {
                    id: props.synth.id,
                    quantity: isQuantity,
                  },
                ];
                // sets cookie updates with updated value
                setStringifiedCookie('cart', newCart);
                // sets the updated array to the state for quantity cart counter
                props.setItemsInCookieCart(newCart);
                // console.log('show the cart after card added: ', newCart);
              }
            }}
          >
            add to cart
          </button>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}
export async function getServerSideProps(context) {
  // synthId comes from the url

  // 1. get the value of the cookie from the request object ..sometimes it's undefined or empty array
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  console.log(currentCart);
  // // 2. get the id from the url and use it to the match the single synth id
  // const allSynths = await getSynths();
  // const singleSynth = allSynths.find((synth) => {
  //   return synth.id === context.query.synthId;
  // });

  // if (!singleSynth) {
  //   context.res.statusCode = 404;
  // }

  const synthData = await getSynth(context.query.synthId);

  // 3. find the object that represents the synth in the url
  // const currentSynthInCart = currentCart.find(
  //   (synthInCart) => singleSynth.id === synthInCart.id,
  // );

  // console.log('current synth in cart', currentSynthInCart);

  // // 4. create a new object adding the properties from the cookie object to the synth in the database
  // const newObjSynth = { ...singleSynth, ...currentSynthInCart };
  // console.log(newObjSynth);
  return {
    props: {
      synth: synthData,
    },
  };
}
