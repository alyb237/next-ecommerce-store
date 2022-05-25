import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home page</title>
        <meta name="description" content="My Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Used Synthesizers</h1>
        <Image
          src="/korgms20mini_.jpg"
          alt="korgms20mini"
          width="1000"
          height="539"
          priority
        />
      </main>
    </div>
  );
}
