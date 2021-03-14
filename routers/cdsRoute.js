const express = require('express')
const router = express.Router()
const cdsController = require('./../controllers/cdsController')

// GET //
router.get('/newId', cdsController.getNewId)
router.get('/', cdsController.get)
router.get('/getById/:id', cdsController.getById)
router.get('/:id', cdsController.get)

// POST //
router.post('/', cdsController.insert)
router.post('/search', cdsController.search)
router.post('/:id', cdsController.get)

// PUT //
router.put('/update/:id', cdsController.update)

// DELETE //
router.delete('/delete/:id', cdsController.delete)


module.exports = router
