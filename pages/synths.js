import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import { getSynths } from '../util/database';

const mainDiv = css`
  height: 110vh;
  /* Created with https://www.css-gradient.com */
  background: #eef9c3;
  background: -webkit-linear-gradient(top left, #eef9c3, #fbaaff);
  background: -moz-linear-gradient(top left, #eef9c3, #fbaaff);
  background: linear-gradient(bottom right, #eef9c3, #fbaaff);

  h3 {
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

// const carouselDiv = css`
//   justify-content: center;
//   margin: 0%;
//   padding: 0%;
//   border-radius: 10px;
// `;

// const gradientText = css`
//   body,
//   html {
//     margin: 0;
//     padding: 0;
//     height: 100%;
//   }
//   body {
//     background: #f1f1f1;
//     background-size: cover;
//     font-family: 'Cabin Condensed', sans-serif;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
//   svg {
//     font-weight: bold;
//     max-width: 600px;
//     height: 100%;
//   }
// `;

export default function Synth(props) {
  return (
    <div css={mainDiv}>
      <Head>
        <title>Synths</title>
        <meta name="description" content="List of used synthesizers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>For Sale</h3>
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

      {/* <Carousel>
        <div css={carouselDiv}>
          <Image
            src="/korg_ms20_pink.jpg"
            alt="korgms20mini"
            width="340"
            height="220"
          />
        </div>
        <div>
          <Image src="/2.jpg" alt="cr-78" width="340" height="220" />
        </div>
        <div>
          <Image src="/3.jpg" alt="minimoog-d" width="340" height="220" />
        </div>
        <div>
          <Image src="/4.jpg" alt="prophet-5" width="340" height="220" />
        </div>
        <div>
          <Image src="/5.jpg" alt="wave-2" width="340" height="220" />
        </div>
        <div>
          <Image src="/6.jpg" alt="tr-606" width="340" height="220" />
        </div>
      </Carousel> */}
    </div>
  );
}
// Anything in getServerSideProps runs in
// Node.js (on the server)
export async function getServerSideProps() {
  // always have to await a promise since its an async function
  const synths = await getSynths();
  // console.log('checking to see what is in dB', synths);
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
