export async function up(sql) {
  await sql`
    CREATE TABLE synths
      ( id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      brand varchar(40) NOT NULL,
      name varchar(40) NOT NULL,
      year varchar(20) NOT NULL,
      price integer NOT NULL,
      quantity integer NOT NULL);

  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE synths`;
}
