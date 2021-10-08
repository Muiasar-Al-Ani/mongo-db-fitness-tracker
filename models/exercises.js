const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        name: {
          type: String,
          trim: true,
          required: "Please enter your exercise name!",
        },
        type: {
          type: String,
          trim: true,
          required: "Please Enter your exercise type!",
        },
        distance: {
          type: Number,
        },
        duration: {
          type: Number,
          required: "Please Enter your exercise duration!",
        },
        weight: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        reps: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
WorkoutSchema.virtual("totalDuration").get(function () {
  // Calculates the total duration of all included exercises for a given workout
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
