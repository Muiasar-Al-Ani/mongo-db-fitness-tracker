const router = require("express").Router();
const db = require("../../models");

// Gets all the workouts data and sends response as json
router.get("/", async ({ res }) => {
  try {
    const dbWorkouts = await db.Workout.find({});
    res.json(dbWorkouts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Updates or Adds if not found new exercises to the workout
router.put("/:id", async (req, res) => {
  try {
    const dbUpdatedWorkout = await db.Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(dbUpdatedWorkout);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creates new workout object in the database
router.post("/", async ({body}, res) => {
  try {
    const dbNewWorkouts = await db.Workout.create(body);
    res.json(dbNewWorkouts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Gets all the workout exercises to show the data as graphs with the help of chart.js in the front end
router.get("/range", async ({ res }) => {
  try {
    const dbWorkouts = await db.Workout.find({}).limit(10);
    res.json(dbWorkouts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
