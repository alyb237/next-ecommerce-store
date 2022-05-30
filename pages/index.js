import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';

const imgResize = css`
  display: flex;
  justify-content: center;
  border-radius: 4px;
`;

const titleStyles = css`
  display: flex;
  justify-content: center;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="description" content="My Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div css={titleStyles}>
          <h1>Used Synthesizers</h1>
        </div>
        <div css={imgResize}>
          <Image
            src="/korgms20mini_.jpg"
            alt="korgms20mini"
            width="1000"
            height="539"
            priority
          />
        </div>
      </main>
    </div>
  );
}
