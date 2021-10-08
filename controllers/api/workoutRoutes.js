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
router.post("/", async ({ body }, res) => {
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
    const dbWorkouts = await db.Workout.find({});
    // Creates all the needed variables
    const lastWorkoutInDays = [];
    const sortedMonths = [];
    const sortedDays = [];

    // Loops throw the dbWorkouts array
    for (let i = 0; i < dbWorkouts.length; i++) {
      // Checks if there is a data in the given position in the dbWorkout array
      if (dbWorkouts[i]) {
        // Creates a month variable that'll be equal to the month from the given element
        let month = dbWorkouts[i].day.toISOString().slice(5, 7);

        // Checks if we have a sortedMonths at the last position or if month is bigger than the last month in the array
        if (
          month > sortedMonths[sortedMonths.length - 1] ||
          sortedMonths[sortedMonths - 1] === undefined
        ) {
          // pushes the month to the sortedMonths array
          sortedMonths.push(month);
          // Creates a day variable that'll be equal to the day from the given element
          let day = dbWorkouts[i].day.toISOString().slice(8, 10);

          // Checks if we have a sortedDays at the last position or if our current day id is bigger than the last in the array
          if (
            day !== sortedDays[sortedDays.length - 1] ||
            sortedDays[sortedDays.length - 1] === undefined
          ) {
            // Pushes the day in to the sortedDays array
            sortedDays.push(day);

            // Pushes the current workout element to the lastWorkoutInDays array
            lastWorkoutInDays.push(dbWorkouts[i]);
          }
        }
      }
    }

    // Returns the last seven workout elements (days)
    const lastSeven = lastWorkoutInDays.slice(-7);
    res.json(lastSeven);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
