// API Object that contains all the front end api call functions
const API = {
    // Makes an API call to the api/workouts and returns the last from the workouts array
    async getLastWorkout() {
        let res;
        try {
          res = await fetch("/api/workouts");
        } catch (err) {
          console.log(err)
        }
        const json = await res.json();
    
        return json[json.length - 1];
      },

      // Makes an API call with the PUT method to the api/workouts/withId route and update the identified workout with the new data 
      async addExercise(data) {
        const id = location.search.split("=")[1];
    
        const res = await fetch("/api/workouts/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
    
        const json = await res.json();
    
        return json;
      },

      // Makes an API call with the POST method to the api/workouts route and creates new workout 
      async createWorkout(data = {}) {
        const res = await fetch("/api/workouts", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        });
    
        const json = await res.json();
    
        return json;
      },

      // Makes an API call to the api/workouts/range route and gets the workouts within range
      async getWorkoutsInRange() {
        const res = await fetch(`/api/workouts/range`);
        const json = await res.json();
    
        return json;
      },

}