import camelCase from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// returns all synths
export async function getSynths() {
  const synths = await sql`
  SELECT * FROM synths
  `;
  return synths.map((synth) => camelCase(synth));
}

// returns only one synth
export async function getSynth(id) {
  const [synth] = await sql`
  SELECT * FROM synths
  WHERE id = ${id}
  `;
  return camelCase(synth);
}

// want to receive one object from an array of objects with [synth] only gives back one

// export const synthsDatabase = [
//   {
//     id: '1',
//     brand: 'Korg',
//     name: 'MS-20',
//     year: '1978',
//     price: '400',
//     quantity: '10',
//   },
//   {
//     id: '2',
//     brand: 'Roland',
//     name: 'CR-78',
//     year: '1978',
//     price: '2,000',
//     quantity: '5',
//   },
//   {
//     id: '3',
//     brand: 'Moog',
//     name: 'Minimoog-D',
//     year: '1980',
//     price: '9,000',
//     quantity: '3',
//   },
//   {
//     id: '4',
//     brand: 'Sequential',
//     name: 'Prophet-5',
//     year: '1977',
//     price: '4,000',
//     quantity: '4',
//   },
//   {
//     id: '5',
//     brand: 'PPG',
//     name: 'Wave-2',
//     year: '1981',
//     price: '18,000',
//     quantity: '2',
//   },
//   {
//     id: '6',
//     brand: 'Roland',
//     name: 'TR-606',
//     year: '1981',
//     price: '700',
//     quantity: '7',
//   },
// ];
