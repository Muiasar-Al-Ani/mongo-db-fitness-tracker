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

  initWorkout();