// import { useRouter } from 'next/router';
// useRouter is slow its only good in the front end

import { synthsDatabase } from '../../util/database';

// [synthId] becomes the variable that will be accessible
export default function Animal(props) {
  // const router = useRouter();
  // const { synthId } = router.query;
  // will always go to this page creates a dynamic route synths/600
  return <div>this will show all synths {props.synthId}</div>;
}

// context allows us
export function getServerSideProps(context) {
  // synthId comes from the url
  const synthId = context.query.synthId;
  const synth = synthsDatabase.find((synth) => {
    return synth.id === synthId;
  });
  return {
    props: {},
  };
}
