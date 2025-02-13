/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Pull your server into this file and start it!
*/
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const server = require('./api/server');

const PORT = process.env.PORT || 9000;

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some actions and projects!</h2>`);
  });

  
server.get('*', (req, res) => {
    res.status(404).json({
        message: `This endpoint is not valid`
    })
})



server.use((err, req, res, next) => {//eslint-disable-line 
    res.status(500).json({
        message: err.message, 
        stack: err.stack,
    })
})


server.listen(PORT, () => {
    console.log(`Server listening on port :${PORT}`)
})