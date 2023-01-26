const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getCodes, getCodeById, updateCode } = require('./code.controller')
const router = express.Router()

router.get('/', log, getCodes)
router.get('/:id', getCodeById)
router.put('/:id', updateCode)

module.exports = router