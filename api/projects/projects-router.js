// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const Action = require('../actions/actions-model');

const { validateProject, validateProjectId } = require('./projects-middleware');

const router = express.Router();
// Inside `api/projects/projects-router.js` build the following endpoints:

// - [ ] `[GET] /api/projects`
//   - Returns an array of projects as the body of the response.
//   - If there are no projects it responds with an empty array.



router.get('/', (req, res, next) => {

    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)

})
// - [ ] `[GET] /api/projects/:id`
//   - Returns a project with the given `id` as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
    
})
// - [ ] `[POST] /api/projects`
//   - Returns the newly created project as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.post('/', validateProject, async (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})
// - [ ] `[PUT] /api/projects/:id`
//   - Returns the updated project as the body of the response.
//   - If there is no project with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

router.put('/:id', validateProject, validateProjectId,  (req, res, next) => {
    Project.update(req.params.id, {notes: req.notes, description: req.description, completed: req.completed})
    .then(() => {
        return Project.get(req.params.id)
      })
      .then(updateProject => {
        res.status(200).json(updateProject)
      })
      .catch(next)
})

// - [ ] `[DELETE] /api/projects/:id`
//   - Returns no response body.
//   - If there is no project with the given `id` it responds with a status code 404.

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.remove(req.params.id)
        res.json(result)
   
       }
       catch (err) {
         next(err)
       }
    
})

// - [ ] `[GET] /api/projects/:id/actions`
//   - Returns an array of actions (could be empty) belonging to a project with the given `id`.
//   - If there is no project with the given `id` it responds with a status code 404.


//elements of this are not correct yet
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id )
        res.status(200).json(result)
      } 
      catch (err) {
      next(err)
      }


})

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.
// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
// remove(): the remove method accepts an id as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
// The projects-model.js includes an extra method called getProjectActions() that takes a project id as its only argument and returns a list of all the actions for the project.


module.exports = router