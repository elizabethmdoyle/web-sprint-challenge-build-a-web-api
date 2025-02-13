const express = require('express');

const server = express();

//import middleware here
const { actionsLogger } = require('./actions/actions-middlware')
const { projectsLogger } = require('./projects/projects-middleware')

// Configure your server here
server.use(express.json())

//initializing logger
server.use(actionsLogger)
server.use(projectsLogger)

// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require('../api/actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require('../api/projects/projects-router');


//server.use()  - for middleware
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)



// Do NOT `server.listen()` inside this file!

module.exports = server;
