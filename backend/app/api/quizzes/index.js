const { Router } = require('express')

const { Quiz, Question } = require('../../models')
const QuestionsRouter = require('./questions')

const router = new Router()


router.get('/', (req, res) => {
  try {
    const quizlist = Quiz.get()
    const questions = Question.get()
    quizlist.forEach((quiz) => {
      quiz.questions = questions.filter((q) => parseInt(q.quizId) === parseInt(quiz.id))
    })
    res.status(200).json(quizlist)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId)
    const questions = Question.get()
    quiz.questions = questions.filter((q)=> parseInt(q.quizId) === parseInt(quiz.id))
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.params.quizId)
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({ ...req.body })
    res.status(201).json(quiz)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})
router.delete('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.delete(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.params.quizId)
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
  console.log(req.body)
})

module.exports = router
router.use('/:quizId/questions', QuestionsRouter)
