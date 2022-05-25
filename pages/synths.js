import { css } from '@emotion/react';
import Head from 'next/head';

const synthsListStyles = css`
  border: 1px solid;
  border-radius: 4px;
  padding: 12px 16px;
  & + & {
    margin-top: 10px;
  }
`;

const synthsList = [
  { id: 1, brand: 'Korg', name: 'MS-20', year: '1978' },
  { id: 2, brand: 'Roland', name: 'CR-78', year: '1978' },
  { id: 3, brand: 'Moog', name: 'Minimoog-D', year: '1980' },
  { id: 4, brand: 'Sequential', name: 'Prophet-5', year: '1977' },
  { id: 5, brand: 'PPG', name: 'Wave-2', year: '1981' },
  { id: 6, brand: 'Roland', name: 'TR-606', year: '1981' },
];
console.log(synthsList);

export default function Synths() {
  return (
    <div>
      <Head>
        <title>Synths</title>
        <meta name="description" content="List of used synthesizers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>List of Used Synthesizers</h1>

      <div>
        <div css={synthsListStyles}>
          <div>Brand:</div>
          <div>Name:</div>
          <div>Year:</div>
          <div>Price:</div>
        </div>
      </div>
    </div>
  );
}
