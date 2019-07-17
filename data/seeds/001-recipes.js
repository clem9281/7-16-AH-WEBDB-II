exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        {
          name: "Chicken Vesuvio",
          instructions: "Cook the chicken",
          servings: 10,
          dish: "Chicago Italian"
        },
        {
          name: "Korean Fried Chicken",
          instructions: "Cook the chicken",
          servings: 10,
          dish: "Korean"
        },
        {
          name: "Chicken Parm",
          instructions: "Cook the chicken",
          servings: 10,
          dish: "Italian"
        }
      ]);
    });
};
