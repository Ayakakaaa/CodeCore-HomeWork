const knex = require("./client");

// this is a helper module for querying our db
module.exports = {
  // get all cohorts
  getAll() {
    return knex("cohorts").select("*");
  },
  // get one cohort
  getOne(id) {
    return knex("cohorts")
      .where("id", id)
      .first();
  },
  // create a cohort
  create(cohort) {
    return knex("cohorts").insert(cohort, "*");
  },
  // update a cohort
  update(id, cohort) {
    console.log("i am about to update cohort: ", cohort);
    return knex("cohorts")
      .where("id", id)
      .update(cohort, "*");
  },
  // delete a cohort
  delete(id) {
    return knex("cohorts")
      .where("id", id)
      .del();
  }
};