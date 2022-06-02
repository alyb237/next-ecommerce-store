-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

CREATE TABLE synths
( id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
brand varchar(40) NOT NULL,
name varchar(40) NOT NULL,
year varchar(20) NOT NULL,
price integer NOT NULL,
quantity integer NOT NULL);


SELECT * FROM synths;

INSERT INTO synths (brand, name, year, price, quantity)
VALUES
('Korg', 'MS-20', '1978', 400, 10),
('Roland', 'CR-78', '1978', 2000, 5),
('Moog', 'Minimoog-D', '1980', 9000, ),
('Sequential', 'Prophet-5', '1977', 4000, 4),
('PPG', 'Wave-2', '1981', 18000, 2),
('Roland', 'TR-606', '1981', 700, 7)

-- export const synthsDatabase = [
--   {
--     id: '1',
--     brand: 'Korg',
--     name: 'MS-20',
--     year: '1978',
--     price: '400',
--     quantity: '10',
--   },
--   {
--     id: '2',
--     brand: 'Roland',
--     name: 'CR-78',
--     year: '1978',
--     price: '2,000',
--     quantity: '5',
--   },
--   {
--     id: '3',
--     brand: 'Moog',
--     name: 'Minimoog-D',
--     year: '1980',
--     price: '9,000',
--     quantity: '3',
--   },
--   {
--     id: '4',
--     brand: 'Sequential',
--     name: 'Prophet-5',
--     year: '1977',
--     price: '4,000',
--     quantity: '4',
--   },
--   {
--     id: '5',
--     brand: 'PPG',
--     name: 'Wave-2',
--     year: '1981',
--     price: '18,000',
--     quantity: '2',
--   },
--   {
--     id: '6',
--     brand: 'Roland',
--     name: 'TR-606',
--     year: '1981',
--     price: '700',
--     quantity: '7',
--   },
-- ];