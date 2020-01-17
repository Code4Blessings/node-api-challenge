const express = require('express');

const router = express.Router();

const actionData = require('../data/helpers/actionModel')

//Get a list of projects

router.get('/', (req, res) => {
    actionData.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The action information could not be retrieved."
            })
        })
});

//Create a project

router.post('/', (req, res) => {
    const newAction = req.body;
    const id = req.params.id;
    if (!newAction.description || !newAction.project_id || !newAction.notes) {
        res.status(400).json({
            errorMessage: "Notes, project_id, and description are required"
        })
    } else if (newAction.description.length > 128) {
        res.status(413).json({
            errorMessage: "Description cannot exceed 128 characters"
        })
    } else {
        actionData.insert(newAction)
            .then(action => {
                console.log(action)
                actionData.getById(action.id)
                    .then(actionId => {
                        res.status(201).json(actionId)
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
    const {
        id
    } = req.params;
    actionData.remove(id)
        .then(actionRemoved => {
            if (actionRemoved) {
                res.status(204).json(actionRemoved)
            } else {
                res.status(404).json({
                    errorMessage: "The acion with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: "The action could not be removed"
            })
        })
});

//Update a project

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {description, project_id, notes} = req.body;
    if (!description || !notes || !project_id) {
        return res.status(400).json({
            errorMessage: "Please provide project_id, description, and notes for the project."
        })
    }
    actionData.update(id, {description, notes, project_id})
        .then(actionUpdate => {
            if (actionUpdate) {
                actionData.getById(id)
                    .then(action => {
                        res.status(201).json(action)
                    })
            } else {
                res.status(404).json({
                    errorMessage: "The action with the specified ID does not exist."
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