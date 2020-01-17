const express = require('express');

const projectRouter = require('../projects/project-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({
        Greeting: "Greetings from Project Data!!!"
    })
})

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);
    next();
}

server.use('/api/projects', projectRouter);

module.exports = server;


