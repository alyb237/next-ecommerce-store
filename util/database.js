import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

// console.log(
//   await sql`
//   SELECT * FROM synths`,
// );

// await sql.end();

export const synthsDatabase = [
  {
    id: '1',
    brand: 'Korg',
    name: 'MS-20',
    year: '1978',
    price: '400',
    quantity: '10',
  },
  {
    id: '2',
    brand: 'Roland',
    name: 'CR-78',
    year: '1978',
    price: '2,000',
    quantity: '5',
  },
  {
    id: '3',
    brand: 'Moog',
    name: 'Minimoog-D',
    year: '1980',
    price: '9,000',
    quantity: '3',
  },
  {
    id: '4',
    brand: 'Sequential',
    name: 'Prophet-5',
    year: '1977',
    price: '4,000',
    quantity: '4',
  },
  {
    id: '5',
    brand: 'PPG',
    name: 'Wave-2',
    year: '1981',
    price: '18,000',
    quantity: '2',
  },
  {
    id: '6',
    brand: 'Roland',
    name: 'TR-606',
    year: '1981',
    price: '700',
    quantity: '7',
  },
];
