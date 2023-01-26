const codeService = require('./code.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getCodes(req, res) {
  try {
    logger.debug('Getting Codes')

    const codes = await codeService.query()
    res.json(codes)
  } catch (err) {
    logger.error('Failed to get codes', err)
    res.status(500).send({ err: 'Failed to get codes' })
  }
}

async function getCodeById(req, res) {
  try {
    const codeId = req.params.id
    const code = await codeService.getById(codeId)
    res.json(code)
  } catch (err) {
    logger.error('Failed to get code', err)
    res.status(500).send({ err: 'Failed to get code' })
  }
}

async function updateCode(req, res) {
  try {
    // const code = req.body
    // const updatedCode = await codeService.update(code)
    // res.json(updatedCode) 

    // NOTE try to Opitimize http req 25/1-->12:32 pm
    const payload = req.body
    console.log(payload)
    const updatedCode = await codeService.update(payload.code)
    socketService.customBroadcast({ type: 'load-code', data: payload.code._id, socketId: payload.socketId })
    res.json(updatedCode)

  } catch (err) {
    logger.error('Failed to update code', err)
    res.status(500).send({ err: 'Failed to update code' })

  }
}

module.exports = {
  getCodes,
  getCodeById,
  updateCode,
}
