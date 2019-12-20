const express = require("express");
const router = express.Router();

const queries = require("../db/queries");

const isValidId = (req, res, next) => {
  if (!isNaN(req.params.id)) return next();
  res.status(400);
  next(new Error("Invalid Id"));
};

const validCohort = cohort => {
  const hasName = typeof cohort.name === "string" && cohort.name.trim() !== "";
  const hasMembers = typeof cohort.members === "string" && cohort.members.trim() !== "";
  const haslogoUrl = typeof cohort.logoUrl === "string" && cohort.logoUrl.trim() !== "";

  return hasName && haslogoUrl && hasMembers;
};

router.get('/', (req, res, next)=>{
    console.log("we are in the cohorts.js route");
    next();
})

//new
router.get("/new",(req,res)=>{
    res.render("cohorts/new");
});
router.post("/new",(req,res)=>{
  console.log("we are in post cohorts/new");
  console.log("req body: ", req.body);
  console.log("cohort valid?", validCohort(req.body));
  if (validCohort(req.body)) {
    queries.create(req.body).then(cohort => {
      console.log("cohort submitted. cohort returned: ",typeof cohort, cohort[0]);
      res.redirect(`/cohorts/${cohort[0].id}`);
    });
  } else {
    res.redirect("/cohorts/new");
  }
});

//index
router.get("/",(req,res)=>{
  console.log("we are in here index route section");
  queries.getAll().then(cohorts =>{
    console.log("all cohorts:" + typeof cohorts);
    res.render("cohorts/index", {
      cohorts: cohorts
    });
  })
});

// get id => show
// router.get("/:id", isValidId, (req, res, next) => {
//   const id = req.params.id;
//   queries.getOne(id).then(cohort => {
//     if (cohort) {
//       res.render("cohorts/show", {
//         cohort: cohort
//       });
//     } else {
//       res.status(404);
//       next(new Error("Record Not Found"));
//     }
//   });
// })

//show
router.get("/:id",(req,res)=>{
  console.log("hellllo")
  const id = req.params.id;
  queries.getOne(id).then(cohort => {
    if (cohort) {
      const teams = [];
      const choice = req.query.choice;
      const quantity = parseInt(req.query.quantity);
      if (quantity < 0) quantity = 0;

      if(choice && quantity) {
        const memberArr = cohort.members.split(",");
        const memberLen = memberArr.length;
        let list = [];
        const numberOfMembers = Math.floor(memberLen / quantity);
      
        if(choice === "teamCount"){
          for (let j=0; j<quantity; j++){
            teams.push([]);
          }
          while (memberArr.length) {
            for (let j=0; j<quantity; j++){
              if(memberArr.length<=0) break;
              const index = Math.floor(Math.random()*memberArr.length);
              teams[j].push(memberArr[index]);
              memberArr.splice(index,1);
            }
          }
          for (let j=0; j<quantity; j++){
            teams[j] = teams[j].join(",");
          }
        }
        
        if(choice === "numberPerTeam"){
          for(let j=0; j<Math.ceil(memberLen/quantity); j++){
            let team = [];
            for(let i=1; i<=quantity; i++){
              const index = Math.floor(Math.random()*memberArr.length)
              team.push(memberArr[index]);
              memberArr.splice(index,1);
              if(memberArr.length<=0) break;
            }
            teams.push(team.join(","));
          }
        }
      }
      res.render("cohorts/show",{
        cohort: cohort,
        teams: teams
      })
    } 
    else {
      res.status(404);
      next(new Error("Record Not Found"));
    }
  })
});


  

router.get("/:id/edit", isValidId, (req, res, next) => {
  const id = req.params.id;
  queries.getOne(id).then(cohort => {
    if (cohort) {
      res.render("cohorts/edit", {
        cohort: cohort
      });
    } else {
      res.status(404);
      next(new Error("Record Not Found"));
    }
  });
})

router.post("/:id/edit", isValidId, (req, res, next) => {
  const id = req.params.id;
  queries.update(id, req.body).then(cohorts => {
    if (cohorts) {
      res.redirect(`/cohorts/${cohorts[0].id}`);
    } else {
      res.status(404);
      next(new Error("Record Not Found"));
    }
  });
})

router.post("/:id/delete", isValidId, (req, res, next) => {
  const id = req.params.id;
  console.log("i am in the cohort delete route")
  queries.delete(id).then(result => {
    // console.log("record deleted, this is result: ", result);
    res.redirect(`/cohorts`);
  });
})



module.exports = router;


