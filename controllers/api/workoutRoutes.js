const router = require("express").Router();
const db = require("../../models");

// Gets all the workouts data and sends response as json
router.get("/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
