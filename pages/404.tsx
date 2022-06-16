import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const pageStyles = css`
  height: 100vh;
  background-color: #fee2f8;
  background-image: linear-gradient(315deg, #fee2f8 0%, #dcf8ef 74%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function WrongPage() {
  return (
    <div css={pageStyles}>
      <Head>
        <title> Oops! 404 🤦 </title>
        <meta name="description" content="wrong page" />
      </Head>

      <h1>Oops! 404 🤦 </h1>
      <Link href="/">
        <a>Back to synths</a>
      </Link>
    </div>
  );
}
