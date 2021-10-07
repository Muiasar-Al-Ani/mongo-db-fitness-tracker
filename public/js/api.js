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

      // Makes an API call to the api/workouts/withId route and update the identified workout with the new data 
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

}