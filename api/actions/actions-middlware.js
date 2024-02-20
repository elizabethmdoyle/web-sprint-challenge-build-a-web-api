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




async function validateAction(req, res, next) {
    try {
        const {project_id, description, notes} = req.body;
        const isValid = await Action.get(project_id)
        if (!project_id || !description || !notes ) {
            next({status : 400, message : "need projectid, description, and notes"})
        } else if (!isValid) {
            next({status : 404, message  : `project with id ${project_id} does not exist`})
        } else {
            next(); 
        }
    } catch (err) { next(err) }
}

async function validateActionPut(req, res, next) {
    try {
        const {description,notes,completed} = req.body;
        if (!description || !notes || !completed) {
            next({status : 400, message : "need description, completed, and notes"})
        } else {
            next(); 
        }
    } catch (err) { next(err) }
}


module.exports = {
    actionsLogger,
    validateActionId,
    validateAction,
    validateActionPut

}