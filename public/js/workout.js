// Gets last workout and calls the renderWorkoutSummary or renderNoWorkoutText functions
async function initWorkout() {
    const lastWorkout = await API.getLastWorkout();
    console.log("Last workout:", lastWorkout);
    if (lastWorkout) {
      document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);
  
      const workoutSummary = {
        date: formatDate(lastWorkout.day),
        totalDuration: lastWorkout.totalDuration,
        numExercises: lastWorkout.exercises.length,
        ...tallyExercises(lastWorkout.exercises)
      };
  
      renderWorkoutSummary(workoutSummary);
    } else {
      renderNoWorkoutText()
    }
  }

  // Gets the tallied exercises
  function tallyExercises(exercises) {
    const tallied = exercises.reduce((accumulator, currentValue) => {
      if (currentValue.type === "resistance") {
        accumulator.totalWeight = (accumulator.totalWeight || 0) + currentValue.weight;
        accumulator.totalSets = (accumulator.totalSets || 0) + currentValue.sets;
        accumulator.totalReps = (accumulator.totalReps || 0) + currentValue.reps;
      } else if (currentValue.type === "cardio") {
        accumulator.totalDistance = (accumulator.totalDistance || 0) + currentValue.distance;
      }
      return accumulator;
    }, {});
    return tallied;
  }

  initWorkout();