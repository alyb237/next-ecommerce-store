import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

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

        <Carousel>
          <div>
            <Image
              src="/korg_ms20_pink.jpg"
              alt="korgms20mini"
              width="680"
              height="427"
            />
          </div>
          <div>
            <Image src="/2.jpg" alt="cr-78" width="680" height="427" />
          </div>
          <div>
            <Image src="/3.jpg" alt="minimoog-d" width="680" height="427" />
          </div>
          <div>
            <Image src="/4.jpg" alt="prophet-5" width="680" height="427" />
          </div>
          <div>
            <Image src="/5.jpg" alt="wave-2" width="680" height="427" />
          </div>
          <div>
            <Image src="/6.jpg" alt="tr-606" width="680" height="427" />
          </div>
        </Carousel>

        {/* <div css={imgResize}>
          <Image
            src="/korgms20mini_.jpg"
            alt="korgms20mini"
            width="1000"
            height="539"
            priority
          />
        </div> */}
      </main>
    </div>
  );
}
