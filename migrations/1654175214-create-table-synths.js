exports.up = async (sql) => {
  await sql`
    CREATE TABLE synths
      ( id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand varchar(40) NOT NULL,
      synth_name varchar(40) NOT NULL,
      year varchar(20) NOT NULL,
      price integer NOT NULL,
      quantity integer NOT NULL);

  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE synths`;
};
