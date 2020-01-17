const express = require('express');

const router = express.Router();

const projectData = require('../data/helpers/actionModel')

//Get a list of projects

router.get('/', (req, res) => {
    projectData.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The project information could not be retrieved."
        })
    })
});

//Create a project

router.post('/', (req, res) => {
    const newProject = req.body;
    const id = req.params.id;
    if(!newProject.name || !newProject.description || !newProject.project_id) {
        res.status(400).json({
            errorMessage: "Name, description, and product_id are required"
        })
    }else if(newProject.description.length > 128) {
        res.status(413).json({
            errorMessage: "Description cannot exceed 128 characters"
        })
    }else {
        projectData.insert(newProject)
        .then(project => {
                console.log(project)
                projectData.getById(project.id)
                .then(projectId => {
                    res.status(201).json(projectId)
                })
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "There was an error while saving the user to the database"
                })
            })
    }
})


//Remove a project

router.delete('/:id', (req, res) => {
    // do your magic!
});

//Update a project

router.put('/:id', (req, res) => {
    // do your magic!
});

// custom middleware


module.exports = router;