const { model, Schema } = require('mongoose')

const WorkoutSchema = new Schema({
  day: Date,
  exercises: [{
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
  }],
},
  { typeKey: '$type', toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

WorkoutSchema.virtual('totalDuration').get(function () {
  let total = 0

  this.exercises.forEach(exercise => {
    total += exercise.duration
  })
  return total
})

WorkoutSchema.virtual('totalWeights').get(function () {
  let total = 0

  this.exercises.forEach(exercise => {
    total += exercise.weight
  })
  return total
})

WorkoutSchema.virtual('totalWorkouts').get(function () {
  let total = []

  this.exercises.forEach(exercise => {
    total.push(exercise.name)
  })
  return total
})

module.exports = model('Workout', WorkoutSchema)