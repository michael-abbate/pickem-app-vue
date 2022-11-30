const db = require("../models");
const GroupPicks = db.group_picks;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log('got to create')
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create picks JSON
    const group_pick = {
      // nfl_week: req.body.nfl_week,
      // username: req.body.username,
      favorite: req.body.favorite,
      underdog: req.body.underdog,
      over: req.body.over,
      under: req.body.under,
      lock: req.body.lock
      };
    
    GroupPicks.findOrCreate({
      where: {username: req.body.username, nfl_week: req.body.nfl_week},
      defaults: group_pick
    }).then(([pickRow, isCreated]) => {
      // console.log('Created:', isCreated)
      // console.log(pickRow)
      if(isCreated){
          // pick submitted
          res.send({
            message: "Picks submitted successfully!"
          })
        }
      else {        
          console.log('Pick already submitted for this week!')
          res.status(403).send({
            message: 'Picks already submitted for this week!'
          })
      } 
      });
    
};  

 // Retrieve all NFL Teams from the database.
exports.findAll = (req, res) => {
  console.log("finding picks...")
  const group_picks = req.query.group_picks;
  var condition = group_picks ? { group_picks: { [Op.iLike]: `%${group_picks}%` } } : null;

  GroupPicks.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving group picks."
      });
    });
};

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };