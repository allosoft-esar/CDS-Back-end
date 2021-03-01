const express = require('express')
const router = express.Router()
const cdsController = require('./../controllers/cdsController')

// GET //
router.get('/newId', cdsController.getNewId)
router.get('/', cdsController.get)

// POST //
router.post('/', cdsController.insert)
router.post('/search', cdsController.search)

// PUT //
router.put('/update/:id', cdsController.update)

// DELETE //
router.delete('/delete/:id', cdsController.delete)


// ALL //
router.all('/:id', cdsController.get)

module.exports = router
