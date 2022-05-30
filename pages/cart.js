import Head from 'next/head';
import Link from 'next/link';
import { synthsDatabase } from '../util/database';

export default function Cart(props) {
  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {props.synths.map((synth) => {
          return (
            <li key={`product-${synth.id}`}>
              <Link href={`/synths/${synth.id}`}>{synth.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// export function getServerSideProps() {
//   return {
//     props: {
//       synths: synthsDatabase,
//     },
//   };
// }
