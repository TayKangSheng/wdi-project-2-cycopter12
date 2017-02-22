const express = require('express')
const router = express.Router()
const snackController = require('../controllers/snackController')
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

router.get('/', snackController.list)

router.get('/:id/edit', snackController.edit)

router.get('/:id', snackController.show)

router.post('/', upload.single('myFile'),snackController.create)

router.put('/:id', snackController.update)

router.delete('/:id', snackController.delete)


module.exports = router
