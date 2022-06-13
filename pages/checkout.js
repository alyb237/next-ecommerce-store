import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { setStringifiedCookie } from '../util/cookies';
import { getSynths } from '../util/database';

const mainContentDiv = css`
  display: flex;
  justify-content: center;
`;

const mainFormStyles = css`
  display: flex;
  justify-content: center;
`;

const divFormStyles = css`
  display: flex;
  justify-content: center;

  .checkoutInfo {
    display: flex;
    justify-content: center;
  }
  .submitButtonStyles {
  }
`;

export default function Checkout(props) {
  // get sum of cart
  // maps through the array of objects brought in through the props
  // extract the price and quantity information from foundSynths object - converts it to a Number
  // multiply and return a total price

  const totalPrice = props.foundSynths.map((synth) => {
    const synthPrice = Number(synth.price);
    const synthCounter = Number(synth.quantity);
    const synthPriceTotal = synthPrice * synthCounter;
    return synthPriceTotal;
  });
  console.log('total price in checkout', totalPrice);

  function add(accumulator, a) {
    // console.log(`first total: ${accumulator}`);
    // console.log(`next total: ${a}`);
    // first total: 2000
    // next total: 4200
    return accumulator + a;
  }
  const sum = totalPrice.reduce(add, 0);

  // get total quantity here
  const totalQuantity = props.foundSynths.map((synthQuantity) => {
    const synthCounterTwo = Number(synthQuantity.quantity);
    return synthCounterTwo;
  });
  console.log('total quantity in cart is', totalQuantity);

  function addQ(acc, b) {
    return acc + b;
  }
  const summedQuantity = totalQuantity.reduce(addQ, 0);
  console.log(summedQuantity);

  // use router function to reroute to thank you page on click of the submit button
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setStringifiedCookie('cart', []);
    props.setItemsInCookieCart([]);

    router.push('/thanks').catch(() => {});
  };

  return (
    <div css={mainContentDiv}>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main css={mainFormStyles}>
        <form onSubmit={handleSubmit}>
          <div css={divFormStyles}>
            <ul className="inputStyles">
              <li>
                <input
                  placeholder="first name"
                  data-test-id="checkout-first-name"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="last name"
                  data-test-id="checkout-last-name"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="email"
                  data-test-id="checkout-email"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="address"
                  data-test-id="checkout-address"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="city"
                  data-test-id="checkout-city"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="email"
                  data-test-id="checkout-email"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="postal code"
                  data-test-id="checkout-postal-code"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="country"
                  data-test-id="checkout-country"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="country"
                  data-test-id="checkout-country"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="credit card"
                  data-test-id="checkout-credit-card"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="expiration-date"
                  data-test-id="checkout-expiration-date"
                  required
                />
              </li>
              <li>
                <input
                  placeholder="security code"
                  data-test-id="checkout-security-code"
                  required
                />
              </li>
            </ul>
            {/* <div className="submitButtonStyles">
              <button data-test-id="checkout-confirm-order">Submit</button>
            </div> */}
          </div>

          <div>
            <div className="checkoutInfo">
              <div className="submitButtonStyles">
                <button data-test-id="checkout-confirm-order">Submit</button>
              </div>
              <h4>Total items in cart are: {summedQuantity}</h4>
              <h3>Total sum is {sum}</h3>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get cookies
  const currentCart = context.req.cookies.cart
    ? JSON.parse(context.req.cookies.cart)
    : [];
  // get database
  const allSynths = await getSynths();

  // create array to store found synths in cookies
  const foundSynths = [];

  // map through items in cookie cart and database to see what is in the cart
  for (const synth of currentCart) {
    const synthData = allSynths.find((synthItem) => {
      return synthItem.id === synth.id;
    });

    if (!synthData) {
      context.res.statusCode = 404;
    }
    // create a new object adding the properties from the cookie object to the synth in the database
    const superSynth = { ...synthData, ...synth };

    // add to array
    foundSynths.push(superSynth);
    console.log('found synths in checkout page', foundSynths);
  }
  return {
    props: {
      foundSynths: foundSynths,
    },
  };
}
