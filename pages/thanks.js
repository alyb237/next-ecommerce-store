import { css } from '@emotion/react';
import Head from 'next/head';

const vectroStyle = css`
  display: flex;
  justify-content: center;
  margin: 0px;
  height: 100vh;
  align-items: center;
  background-color: #e7eff9;
  background-image: linear-gradient(315deg, #e7eff9 0%, #cfd6e6 74%);

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

export default function Shop() {
  return (
    <div>
      <Head>
        <title>Thank you for your order</title>
        <title>Thank you for your order!</title>
        <meta name="description" content="thanks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div css={vectroStyle}>
        <h1 className="vectro">
          <span className="vectro-body">Thank You!</span>
        </h1>
      </div>
    </div>
  );
}
