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
    
    // TODO: perform logic to make sure user hasn't already submitted a pick for this week!

    // Create picks JSON
    const group_pick = {
      nfl_week: req.body.nfl_week,
      username: req.body.username,
      favorite: req.body.favorite,
      underdog: req.body.underdog,
      over: req.body.over,
      under: req.body.under,
      lock: req.body.lock,
      pick_json: req.body.pick_json
    };
    console.log(group_pick);
    // Save Tutorial in the database
    GroupPicks.create(group_pick)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while submitting your picks."
        });
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