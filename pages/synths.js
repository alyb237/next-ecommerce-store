import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { getSynths } from '../util/database';

const synthsListStyles = css`
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 4px;
  padding: 12px 16px;
  background: #dccbab;
  margin: 2px;
  /* width: 200px;
  height: 200px; */
  & + & {
    margin-top: 10px;
  }
`;

const synthListItemStyles = css`
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */
  display: inline-block;
  justify-content: center;
  background: #f3ece5;
  padding: 10px;
  border: 2px solid;
  border-radius: 4px;
  margin: 5px;
  width: 150px;
  height: 150px;
`;

const titleSynthStyles = css`
  display: flex;
  justify-content: center;
`;

const synthItem = css`
  display: flex;
  padding: 5px;
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
              <div css={synthItem}>Brand: {synth.brand}</div>
              <div css={synthItem}>
                Name:{' '}
                <Link href={`/synths/${synth.id}`}>{synth.synthName}</Link>
              </div>
              <div css={synthItem}>Year: {synth.year}</div>
              <div data-test-id="product-price" css={synthItem}>
                Price: ${synth.price}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// Anything in getServerSideProps runs in
// Node.js (on the server)
export async function getServerSideProps() {
  // always have to await a promise since its an async function
  const synths = await getSynths();
  // console.log(synths);
  return {
    // Anything you pass in the props object
    // will get passed ot the component at the top
    // in the props parameter in the function.
    // when database is imported all info is sent to props
    // taking the server import { getSynths } from './../util/database';
    // side only database and sent it via props (node.js)
    // gSSP only in pages directory
    props: {
      synths: synths,
    },
  };
}
