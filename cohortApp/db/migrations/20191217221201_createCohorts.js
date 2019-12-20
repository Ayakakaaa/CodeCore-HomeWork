exports.up = function(knex, Promise) {
    return knex.schema.createTable("cohorts", table => {
      table.increments("id"); 
      table.string("name")
      table.text("members");
      table.string("logoUrl")
      table.timestamp("createdAt").defaultTo(knex.fn.now()); // createdAt timestamp default ot now()
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable("cohorts");
  };