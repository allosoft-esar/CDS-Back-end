const express = require('express')
const router = express.Router()
const sourcecontroller = require('./../controllers/sourcecontroller')

// GET //
router.get('/', sourcecontroller.get)
router.get('/:id', sourcecontroller.get)

// POST //
router.post('/', sourcecontroller.insert)

// PUT //
router.put('/:id', sourcecontroller.update)

// DELETE //
router.delete('/:id', sourcecontroller.delete)

module.exports = router
