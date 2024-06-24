
const ProjectModel= require('../models/ProjectModel');
const RewardModel = require('../models/RewardModel');


// Create a new project with rewards (Admin only)


const postProject = (req, res) => {

  const { title, description, targetAmount, daysLeft, rewards } = req.body;

  // Create the project
  ProjectModel.create({ title, description, targetAmount, daysLeft })
    .then(project => {

      // If rewards are provided, create them
      if (rewards && rewards.length > 0) {
        const rewardDocs = rewards.map(reward => ({
          ...reward,
          project: project._id
        }));

        return RewardModel.insertMany(rewardDocs)
          .then(createdRewards => {

            // Add reward IDs to project
            project.rewards = createdRewards.map(reward => reward._id);
            return project.save();
          })
          .then(() => res.status(201).json(project))
          .catch(error => res.status(400).json({ error: error.message }));
      } else {
        res.status(201).json(project);
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

// Get all projects

const getProjects = (req, res) => {
  ProjectModel.find()
  .populate('rewards')
  .then(projects => res.status(200).json(projects))
  .catch(error => res.status(400).json({ error: error.message }));
}



// Get a single project by ID
 

  const getSingleProject = (req, res) => {

  ProjectModel.findById(req.params.projectId)
    .populate('rewards')
    .then(project => {
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json(project);
    })
    .catch(error => res.status(400).json({ error: error.message }));
};

module.exports = {postProject , getProjects ,getSingleProject};
