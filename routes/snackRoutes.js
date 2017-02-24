const express = require('express')
const router = express.Router()
const isNotLoggedIn = require('../security/isNotLoggedIn')
const snackController = require('../controllers/snackController')
var multer = require('multer');
var upload = multer({ dest: './uploads/' });

router.get('/', isNotLoggedIn,snackController.list)

router.get('/:id/edit',isNotLoggedIn, snackController.edit)

router.get('/:id',snackController.show)

router.post('/', isNotLoggedIn,upload.single('myFile'),snackController.create)

router.put('/:id', isNotLoggedIn, snackController.update)

router.delete('/:id', isNotLoggedIn,snackController.delete)




module.exports = router
