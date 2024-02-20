// Write your "actions" router here!

const express = require('express');
const Action = require('./actions-model');

const router = express.Router();

// import middleware here if necessary
const { validateAction, validateActionId } = require('./actions-middlware')

// Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)

})

// - [ ] `[GET] /api/actions/:id`3
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.


router.get('/:id', validateAction, validateActionId, (req, res) => {
    res.json(req.action)
})

// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.

// router.post('/', validateAction, (req, res) => {

// })

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.

// router.put('/:id', validateAction, validateActionId, (req, res) => {

// })

// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.
// router.delete('/:id', validateAction, validateActionId, (req, res) => {

// })

// get(): resolves to an array of all the resources contained in the database. If you pass an id to this method it will return the resource with that id if one is found.
// insert(): calling insert passing it a resource object will add it to the database and return the newly created resource.
// update(): accepts two arguments, the first is the id of the resource to update, and the second is an object with the changes to apply. It returns the updated resource. If a resource with the provided id is not found, the method returns null.
// remove(): the remove method accepts an id as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

module.exports = router