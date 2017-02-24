const express = require('express')
const router = express.Router()
const displayController = require('../controllers/displayController')

router.get('/', displayController.list)

router.get('/:id', displayController.show)

router.post('/:id', displayController.comment)

module.exports = router
