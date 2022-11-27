const db = require("../models");
const PickemUser = db.pickemuser;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.title) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a Tutorial
//     const nfl_team = {
//       team_id: req.body.team_id,
//       team_name: req.body.team_name
//     };
  
//     // Save Tutorial in the database
//     PickemUser.create(nfl_team)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the NFL Team."
//         });
//     });
// };  

 // Retrieve all NFL Teams from the database.
exports.findAll = (req, res) => {
  const user = req.query.user;
  var condition = user ? { user: { [Op.iLike]: `%${user}%` } } : null;

  PickemUser.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error:
          err.message || "Some error occurred while retrieving NFL teams."
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