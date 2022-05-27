// import { useRouter } from 'next/router';
// useRouter is slow its only good in the front end

import Image from 'next/image';
import { useEffect } from 'react';
import { synthsDatabase } from '../../util/database';

// [synthId] becomes the variable that will be accessible
export default function Synth(props) {
  // will always go to this page creates a dynamic route synths/600
  // if you want to run things only in the browser useEffect
  useEffect(() => {
    window.localStorage.w = 1;
  }, []);

  if (!props.synth) {
    return <div>Item not listed</div>;
  }
  return (
    <div>
      <h1>{props.synth.name}</h1>

      <div>
        <div>
          <Image src={`/${props.synth.id}.jpg`} width="600" height="298" />
        </div>
        <div>Brand: {props.synth.brand}</div>
        <div>Year: {props.synth.year}</div>
        <div>Price: {props.synth.price}</div>
        {/* this will show all synths {props.synthId} */}
      </div>
    </div>
  );
}

// if you want to run something only on the server
// context allows us
export function getServerSideProps(context) {
  // synthId comes from the url
  const synthId = context.query.synthId;
  const synths = synthsDatabase.find((synth) => {
    return synth.id === synthId;
  });

  if (!synths) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      synth: synths || null,
    },
  };
}
