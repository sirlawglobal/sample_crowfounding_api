const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();

// Cor blocking
const corConfig = {
  origin:true,
  credentials:true,
  allowHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "X-Access-Token",
    "Authorization",
    "Access-Control-Allow-origin"
  ] 
}


// Middleware
app.use(bodyParser.json());
app.use(cors(corConfig));


// MongoDB connection
//db connection
mongoose.connect('mongodb://127.0.0.1:27017/crowdfunding', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const {postProject, getProjects, getSingleProject} = require('./controllers/projectController');

const {postBacker , getAllBacker,getAllBackerById} = require('./controllers/backerController');


app.post('/api/project/new', postProject);

app.get('/', getProjects);

app.get('/api/:projectId', getSingleProject)

app.post('/api/backer', postBacker);

app.get('/api/project/:backerId', getAllBackerById)

app.get('/api/project/:projectId', getAllBacker)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});



// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// // const cors = require('cors');

// const Project = require('./models/ProjectModel'); // Adjust the path if necessary

// const app = express();

// // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// // app.use(cors());

// //db connection
// mongoose.connect('mongodb://127.0.0.1:27017/crowdfunding', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));


// //controllers routing
//   const {postProjects } = require("./controllers/projectController")

// //creation of projects
// app.post('//api/projects/:projectId/backers', postProjects);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
