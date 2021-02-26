const express = require('express')
const router = express.Router()
const cdsController = require('./../controllers/cdsController')

// GET //
router.get('/newId', cdsController.getNewId)
router.get('/', cdsController.get)

// POST //
router.post('/', cdsController.insert)
router.post('/search', cdsController.search)

// ALL //
router.all('/:id', cdsController.get)

module.exports = router
