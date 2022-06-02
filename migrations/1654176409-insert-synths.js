const synths = [
  {
    brand: 'Korg',
    synth_name: 'MS-20',
    year: '1978',
    price: 400,
    quantity: 10,
  },
  {
    brand: 'Roland',
    synth_name: 'CR-78',
    year: '1978',
    price: 2000,
    quantity: 5,
  },
  {
    brand: 'Moog',
    synth_name: 'Minimoog-D',
    year: '1980',
    price: 9000,
    quantity: 3,
  },
  {
    brand: 'Sequential',
    synth_name: 'Prophet-5',
    year: '1977',
    price: 4000,
    quantity: 4,
  },
  {
    brand: 'PPG',
    synth_name: 'Wave-2',
    year: '1981',
    price: 18000,
    quantity: 2,
  },
  {
    brand: 'Roland',
    synth_name: 'TR-606',
    year: '1981',
    price: 700,
    quantity: 7,
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO synths ${sql(
    synths,
    'brand',
    'synth_name',
    'year',
    'price',
    'quantity',
  )}
	`;
};

exports.down = async (sql) => {
  for (const synth of synths) {
    await sql`
		DELETE FROM
			synths
		WHERE
			brand = ${synth.brand} AND
			synth_name = ${synth.synth_name} AND
			year = ${synth.year} AND
			price = ${synth.price} AND
			quantity = ${synth.quantity}
		`;
  }
};
