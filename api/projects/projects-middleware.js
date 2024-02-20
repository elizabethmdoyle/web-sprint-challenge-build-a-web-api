// add middlewares here related to projects
const Project = require('../projects/projects-model');



function projectsLogger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl;
    console.log(`${timestamp} ${method} to ${url}`)
    next()
}

function validateProject(req, res) {
    try {
        const project = await Project.getId(req.params.id)
        if(!project) {
            res.status(404).json({
                message: `Project could not be found`
            })
        } else {
            req.project = project
            next()
        }

    } catch(err) {
        res.status(500).json({
            message: `There was an unspecified error retrieving the project`,
            err: err.message
        })
    }

}

function validateProjectId(req, res, next) {
    
}



module.exports = {
    projectsLogger,
    validateProject,
}