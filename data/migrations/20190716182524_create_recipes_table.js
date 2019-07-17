exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl.text("instructions", "mediumtext").notNullable();
    tbl
      .integer("servings")
      .notNullable()
      .unsigned();
    tbl.string("dish").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes");
};
