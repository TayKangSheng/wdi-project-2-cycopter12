const express = require('express')
const router = express.Router()
const snackController = require('../controllers/snackController')

router.get('/', snackController.list)

router.get('/:id', snackController.show)

router.post('/', snackController.create)

router.get('/:id/edit', snackController.edit)

router.put('/:id', snackController.update)

router.delete('/:id', snackController.delete)

module.exports = router
