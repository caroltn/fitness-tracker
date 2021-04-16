const router = require('express').Router()
const { Workout } = require('../models')

router.get('/workouts', (req, res) => Workout.find()
  .then(workouts => res.json(workouts))
  .catch(err => console.log(err))
)

router.post('/workouts', (req, res) => {

  Workout.create({
    day: new Date().setDate(new Date().getDate() - 0),
    exercises: []
  })
    .then(workout => res.json(workout))
    .catch(err => console.log(err))
})

router.put('/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(req.params.id, {
    $push: {
      exercises: req.body
    }
  })
    .then(workout => {
      res.json(workout)
    })
    .catch(err => console.log(err))
})

router.get('/workouts/range', (req, res) => Workout.find()
  .then(workouts => {
    let totalWorkouts = workouts.map(exe => {
      return {
        exercises: [{
          duration: exe.totalDuration,
          weight: exe.totalWeights,
          name: exe.totalWorkouts
        }]
      }
    })
    res.json(totalWorkouts)
  })
  .catch(err => console.log(err))
)

module.exports = router