// add middlewares here related to actions
const Action = require('../actions/actions-model');

function actionsLogger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl;
    console.log(`${timestamp} ${method} to ${url}`)
    next()
}

function validateActionId(req, res, next) {
    
}

function validateAction(req, res, next) {

}

module.exports = {
    actionsLogger

}