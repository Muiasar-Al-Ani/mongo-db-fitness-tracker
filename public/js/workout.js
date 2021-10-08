// Gets last workout and calls the renderWorkoutSummary or renderNoWorkoutText functions
async function initWorkout() {
    const lastWorkout = await API.getLastWorkout();

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

  // Converts the time format from Unix time to mm/dd/yyyy format
  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
  
    return new Date(date).toLocaleDateString(options);
  }

  // Renders the workout summary workout stats container returned from the database
  function renderWorkoutSummary(summary) {
    const container = document.querySelector(".workout-stats");
  
    const workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };
  
    Object.keys(summary).forEach(key => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");

  
      strong.textContent = workoutKeyMap[key];
      const textNode = document.createTextNode(`: ${summary[key]}`);
  
      p.appendChild(strong);
      p.appendChild(textNode);
  
      container.appendChild(p);
    });
  }
  

  // Renders the "You have not created a workout yet!" if there was no data returned from the database 
  function renderNoWorkoutText() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You have not created a workout yet!"
  
    p.appendChild(strong);
    container.appendChild(p);
  }
  

  initWorkout();