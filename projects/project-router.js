const express = require('express');

const router = express.Router();

const projectData = require('../data/helpers/projectModel')

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
    if(!newProject.description || !newProject.name) {
        res.status(400).json({
            errorMessage: "Name and description are required"
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
    const {id} = req.params;
         projectData.remove(id)
        .then(projectRemoved => {
           if(projectRemoved) {
                   res.status(204).json(projectRemoved)
           }else {
                res.status(404).json({
                    errorMessage: "The project with the specified ID does not exist."
                })
           }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The project could not be removed"
            })
        })
});

//Update a project

router.put('/:id', (req, res) => {
    const id = req.params.id;
      const { name, description } = req.body; 
       if (!description || !name) {
           return res.status(400).json({ 
               errorMessage: "Please provide project_id, description, and notes for the project."
           })
       }
       projectData.update(id, {description, name})
       .then(projectUpdate => {
           if(projectUpdate) {
               projectData.getById(id)
                .then(project => {
                    res.status(201).json(project)
                })
           }else{
               res.status(404).json({
                   errorMessage: "The project with the specified ID does not exist."
               })
           }
       })
       .catch(err => {
           res.status(500).json({
               errorMessage: "The project information could not be modified."
           })
       })
});

// custom middleware


module.exports = router;