// import { useRouter } from 'next/router';
// useRouter is slow its only good in the front end

// import Cookies from 'js-cookie';
import Image from 'next/image';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { synthsDatabase } from '../../util/database';

// [synthId] becomes the variable that will be accessible

export default function Synth(props) {
  const [isQuantity, setIsQuantity] = useState(1);
  console.log(isQuantity);

  if (!props.synth) {
    return <div>Item not listed</div>;
  }

  return (
    <div>
      <div>
        <Image
          src={`/${props.synth.id}.jpg`}
          width="600"
          height="298"
          alt="synth pic"
        />
      </div>
      <div>Brand: {props.synth.brand}</div>
      <div>Year: {props.synth.year}</div>
      <div>Price: {props.synth.price} €</div>

      <br />
      <label>
        Quantity
        <input
          data-test-id="product-quantity"
          step={1}
          type="number"
          name="quantity"
          min="1"
          onChange={(e) => {
            setIsQuantity(e.currentTarget.value);
          }}
        />
      </label>
      <br />
      <button
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
          } else {
            const newCart = [
              ...currentCart,
              {
                id: props.synth.id,
                name: props.synth.name,
                quantity: isQuantity,
              },
            ];
            setStringifiedCookie('cart', newCart);
            console.log('the cart is: ', newCart);
          }
        }}
      >
        add to cart
      </button>
      <br />
    </div>
  );
}
export function getServerSideProps(context) {
  // synthId comes from the url

  // 1. get the value of the cookie from the request object ..sometimes it's undefined or empty array
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  console.log(currentCart);
  // 2. get the id from the url and use it to the match the single synth id
  const singleSynth = synthsDatabase.find((synth) => {
    return synth.id === context.query.synthId;
  });

  if (!singleSynth) {
    context.res.statusCode = 404;
  }

  // 3. find the object that represents the synth in the url
  const currentSynthInCart = currentCart.find(
    (synthInCart) => singleSynth.id === synthInCart.id,
  );

  console.log('current synth in cart', currentSynthInCart);

  // 4. create a new object adding the properties from the cookie object to the synth in the database
  const newObjSynth = { ...singleSynth, ...currentSynthInCart };
  console.log(newObjSynth);
  return {
    props: {
      synth: newObjSynth || null,
    },
  };
}
