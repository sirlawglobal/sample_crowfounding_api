
const mongoose = require('mongoose');
const BackerModel = require('../models/BackerModel');
const ProjectModel = require('../models/ProjectModel');

// Create a new backer and back a project
const postBacker =(req, res) => {
  const { name, email, pledgedAmount, projectId, rewardId } = req.body;

  // Trim the IDs to remove any leading/trailing spaces
  const trimmedProjectId = projectId.trim();
  const trimmedRewardId = rewardId ? rewardId.trim() : null;

  ProjectModel.findById(trimmedProjectId)
    .then(project => {
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      BackerModel.create({ name, email, pledgedAmount, project: trimmedProjectId, reward: trimmedRewardId })
        .then(backer => {
          project.currentAmount += pledgedAmount;
          project.backerCount += 1;
          project.backers.push(backer._id);

          project.save()
            .then(updatedProject => {
              res.status(201).json({ backer, project: updatedProject });
            })
            .catch(error => res.status(400).json({ error: error.message }));
        })
        .catch(error => res.status(400).json({ error: error.message }));
    })
    .catch(error => res.status(400).json({ error: error.message }));
}


// Get all backers for a specific project

const getAllBacker = (req, res) => {
  BackerModel.find({ project: req.params.projectId })
    .then(backers => res.status(200).json(backers))
    .catch(error => res.status(400).json({ error: error.message }));
};


// Get a specific backer by ID

  const getAllBackerById = (req, res) => {


    BackerModel.findById(req.params.backerId)
    .then(backer => {

      if (!backer) {
        return res.status(404).json({ error: 'Backer not found' });
      }
      res.status(200).json(backer);
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

module.exports = {postBacker , getAllBacker, getAllBackerById};
