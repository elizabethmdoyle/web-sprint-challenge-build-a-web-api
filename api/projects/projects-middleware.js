// add middlewares here related to projects
const Project = require('../projects/projects-model');



function projectsLogger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl;
    console.log(`${timestamp} ${method} to ${url}`)
    next()
}
 
async function validateProject (req, res, next) {
    try {
        const project = await Project.get(req.params.id)
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
    projectsLogger,
    validateProject,
    validateProjectId
}