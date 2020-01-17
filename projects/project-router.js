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
    if(!newProject.description || !newProject.project_id || !newProject.notes) {
        res.status(400).json({
            errorMessage: "Name, description, notes, and product_id are required"
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
        .then(userRemoved => {
           if(userRemoved) {
                   res.status(204).json(userRemoved)
           }else {
                res.status(404).json({
                    errorMessage: "The user with the specified ID does not exist."
                })
           }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The user could not be removed"
            })
        })
});

//Update a project

router.put('/:id', (req, res) => {
    const id = req.params.id;
      const { description, project_id, notes } = req.body; 
       if (!description || !project_id || !notes) {
           return res.status(400).json({ 
               errorMessage: "Please provide project_id, description, and notes for the project."
           })
       }
       projectData.update(id, {project_id, description, notes})
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