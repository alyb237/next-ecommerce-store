import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { synthsDatabase } from '../util/database';

const synthsListStyles = css`
  border: 1px solid;
  border-radius: 4px;
  padding: 12px 16px;
  background: #dccbab;
  margin: 2px;
  & + & {
    margin-top: 10px;
  }
`;

const synthListItemStyles = css`
  background: #fff6a7;
  padding: 10px;
  border-radius: 4px;
  margin: 5px;
`;

const titleSynthStyles = css`
  display: flex;
  justify-content: center;
`;

const buttonInputStyles = css`
  display: flex;
  justify-content: space-between;
`;

export default function Synth(props) {
  return (
    <div>
      <Head>
        <title>Synths</title>
        <meta name="description" content="List of used synthesizers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={titleSynthStyles}>
        <h1>List of Used Synthesizers</h1>
      </div>

      <div css={synthsListStyles}>
        {props.synths.map((synth) => {
          return (
            <div
              data-test-id={`product-${synth.id}`}
              key={`products-${synth.id}`}
              css={synthListItemStyles}
            >
              <div>Brand: {synth.brand}</div>
              <div>
                Name: <Link href={`/synths/${synth.id}`}>{synth.name}</Link>
              </div>
              <div>Year: {synth.year}</div>
              <div data-test-id="product-price">Price: {synth.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// Anything in getServerSideProps runs in
// Node.js (on the server)
export function getServerSideProps() {
  return {
    // Anything you pass in the props object
    // will get passed ot the component at the top
    // in the props parameter in the function.
    // when database is imported all info is sent to props
    // taking the server side only database and sent it via props (node.js)
    // gSSP only in pages directory
    props: {
      synths: synthsDatabase,
    },
  };
}
