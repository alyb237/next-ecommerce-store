import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { getSynths } from '../util/database';

const mainDiv = css`
  height: 110vh;
  /* Created with https://www.css-gradient.com */
  background: #eef9c3;
  background: -webkit-linear-gradient(top left, #eef9c3, #fbaaff);
  background: -moz-linear-gradient(top left, #eef9c3, #fbaaff);
  background: linear-gradient(bottom right, #eef9c3, #fbaaff);

  h1 {
    display: flex;
    margin: 0%;
    padding: 50px;
    justify-content: center;
    align-items: center;
  }
`;

const synthsListStyles = css`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  padding: 12px 16px;

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
  box-shadow: 10px 25px 25px #dbedf8;
  border-radius: 4px;
  margin: 5px;
  width: 150px;
  height: 200px;
  text-decoration: none;
`;

const synthItem = css`
  display: flex;
  padding: 5px;
  text-decoration: none;

  a {
    text-decoration: none;
    color: black;
  }
`;

const imgStyles = css`
  /* border: 1px solid #fce9fa; */
  border-radius: 4px;

  .imgBorder {
    border: 2px solid #fce9fa;
    border-radius: 4px;
  }
`;



export default function Synth(props) {
  return (
    <div css={mainDiv}>
      <Head>
        <title>Synths</title>
        <meta name="description" content="List of used synthesizers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>For Sale</h1>
      <div css={synthsListStyles}>
        {props.synths.map((synth) => {
          return (
            <div
              data-test-id={`product-${synth.id}`}
              key={`products-${synth.id}`}
              css={synthListItemStyles}
            >
              <div css={imgStyles}>
                <img
                  src={`/${synth.id}.jpg`}
                  width="110"
                  alt="synth pic"
                  className="imgBorder"
                />
              </div>
              <div css={synthItem}>Brand: {synth.brand}</div>
              <div css={synthItem}>
                Name:{' '}
                <Link href={`/synths/${synth.id}`}>{synth.synthName}</Link>
              </div>
              <div css={synthItem}>Year: {synth.year}</div>
              <div data-test-id="product-price" css={synthItem}>
                Price: €{synth.price}
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
}

export async function getServerSideProps() {

  const synths = await getSynths();

  return {

    props: {
      synths: synths,
    },
  };
}
