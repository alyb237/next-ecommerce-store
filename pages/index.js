import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const mainDiv = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100vw;

  /* Created with https://www.css-gradient.com */
  background: #ff81c7;
  background: -webkit-linear-gradient(top left, #ff81c7, #635ded);
  background: -moz-linear-gradient(top left, #ff81c7, #635ded);
  background: linear-gradient(bottom right, #ff81c7, #635ded);

  .heroImgContainer {
    display: flex;
    justify-content: center;
    /* width: 50%; */
    padding: 20px;
    img {
      border-radius: 200px;
      opacity: 0.9;
    }
  }
`;

const heroStyles = css`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  .heroTextContainer {
    justify-content: center;
    align-content: center;
    width: 50%;
    padding: 10px;
    p {
      justify-content: center;
      align-content: center;
      border: 1px black solid;
      border-radius: 100px;
      margin: 0 auto;
      width: 250px;
      padding: 5px;
      font-size: 16px;
      text-align: center;
      transition: transform 0.2s;
    }
    p:hover {
      border-color: white;
      background-color: #f4f9ac;
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;

const vectroStyle = css`
  display: flex;
  justify-content: center;
  margin: 0px;

  .vectro {
    position: relative;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.1px #f1f1f1;
    font-family: 'Righteous', 'Quicksand', 'sans-serif' cursive;
    /* font-size: 140px;
    margin: 150px 0 50px 0; */
    font-size: 70px;
    margin: 25px 0 25px 0;
  }

  .vectro:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*-webkit-animation:vectro_effect 0.067s infinite;*/
    background: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.05) 0px,
      rgba(255, 255, 255, 0.05) 1px,
      rgba(255, 255, 255, 0) 1px,
      rgba(255, 255, 255, 0) 2px
    );
  }

  .windows .vectro {
    -stroke: 4px #f1f1f1;
  }

  .vectro-body {
    background-clip: text;
    background-image: linear-gradient(
      #c3bfb4 0%,
      #fdfcfa 50%,
      #e8e7e5 51%,
      #757172 52%,
      #e8e9db 100%
    );
    filter: drop-shadow(2px 2px 15px #3f59f4);
  }

  .vectro-red {
    color: #f10c20;
    stroke: 0;
    filter: drop-shadow(2px 2px 15px #f10c20);
    font-style: italic;
    padding-right: 20px;
  }

  .windows .vectro-red {
    padding-right: 30px;
  }

  .vectro-green {
    color: #6bff2b;
    filter: drop-shadow(2px 2px 15px #6bff2b);
    stroke: 0;
    font-style: italic;
    padding-right: 20px;
    margin-left: -20px;
  }

  .windows .vectro-green {
    padding-right: 30px;
    margin-left: -30px;
  }

  .vectro-blue {
    color: #3f59f4;
    filter: drop-shadow(2px 2px 15px #3f59f4);
    stroke: 0;
    font-style: italic;
    padding-right: 20px;
    margin-left: -20px;
  }

  .windows .vectro-blue {
    padding-right: 30px;
    margin-left: -30px;
  }
`;

const textStyles = css`
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="description" content="My Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main css={mainDiv}>
        <div css={vectroStyle}>
          <h1 className="vectro">
            <span className="vectro-body">Synthtronics</span>
            <span className="vectro-red">I</span>
            <span className="vectro-green">I</span>
            <span className="vectro-blue">I</span>
          </h1>
        </div>
        <div css={heroStyles}>
          <div className="heroTextContainer">
            <h1>The Vintage Synth Perfectionist</h1>
            <h2>VINTAGE SYNTHS THAT WORK LIKE NEW</h2>
            <div css={textStyles}>
              Synthtronics takes great pride in providing the most discerning
              musicians and producers worldwide with the finest vintage
              synthesizers and classic electronic musical instruments available
              anywhere.
              <br />
              <br />
              We are detail-oriented perfectionists who meticulously refurbish
              vintage gear to work like new again, if not better. With over 10
              years in the business, you can trust us with all your electronic
              music studio needs.
              <br />
              <br />
              We buy, repair, sell and trade vintage synths and recording studio
              gear and look forward to working with you!
            </div>
            <br />
            <br />
            <Link href="/synths">
              <p>Check out our used synthesizers </p>
            </Link>
          </div>
        </div>
        <div className="heroImgContainer">
          <Image
            src="/microkorg.jpg"
            alt="microkorg"
            width="320"
            height="210"
            priority
          />
        </div>
      </main>
    </div>
  );
}
