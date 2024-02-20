// add middlewares here related to actions
const Action = require('../actions/actions-model');

function actionsLogger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl;
    console.log(`${timestamp} ${method} to ${url}`)
    next()
}

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: `The action could not be found`
            })
        } else {
            req.action = action
            next()
        }

    } catch(err) {
        res.status(500).json({
            message: `There was an unspecified error retrieving the action`,
            err: err.message
        })
    }
    
}

function validateAction(req, res, next) {

    const { name } = req.body;
    if(!name || !name.trim()) {
      res.status(400).json({
        message: `missing required name field`
      })
    } else {
      req.name = name.trim()
      next()
    }

}

module.exports = {
    actionsLogger,
    validateActionId,
    validateAction

}