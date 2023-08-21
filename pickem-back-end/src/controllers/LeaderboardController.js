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
// exports.findAll = (req, res) => {
//   const user = req.query.user;
//   var condition = user ? { user: { [Op.iLike]: `%${user}%` } } : null;

//   PickemUser.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         error:
//           err.message || "Some error occurred while retrieving NFL teams."
//       });
//     });
// };


//TODO create a new table, nfl_seasons, and have schema: season name, startDate, enddate
exports.findAll = async (req, res) => {
  var selected_season = req.body.selected_season;
  
  var date_range = await db.sequelize.query(`SELECT * FROM nfl_seasons WHERE nfl_season = '${selected_season}'`, {   
    type: db.sequelize.QueryTypes.SELECT
  });

  var startDate = date_range[0]['start_date'].toISOString().split('T')[0]
  var endDate = date_range[0]['end_date'].toISOString().split('T')[0]
  console.log('Retrieving leaderboard for', startDate, 'to', endDate)
  
  var leaderboard_query = ` \
                          select \
                          "firstname", \
                          "lastname", \
                          gp."username", \
                          COUNT(case when "favorite" = 1 then 1 end) \
                            + COUNT(case when "underdog" = 1 then 1 end) \
                            + COUNT(case when "over" = 1 then 1 end) \
                            + COUNT(case when "under" = 1 then 1 end) \
                            + COUNT(case when "lock" = 1 then 1 end) \
                            as wins, \
                          COUNT(case when "favorite" = -1 then 1 end) \
                            + COUNT(case when "underdog" = -1 then 1 end) \
                            + COUNT(case when "over" = -1 then 1 end) \
                            + COUNT(case when "under" = -1 then 1 end) \
                            + COUNT(case when "lock" = -1 then 1 end) \
                            as losses, \
                          COUNT(case when "favorite" = 0 then 1 end) \
                            + COUNT(case when "underdog" = 0 then 1 end) \
                            + COUNT(case when "over" = 0 then 1 end) \
                            + COUNT(case when "under" = 0 then 1 end) \
                            + COUNT(case when "lock" = 0 then 1 end) \
                            as pushes \
                        from \
                          grade_picks gp \
                        left join pickemusers p  \
                          on gp.username = p.username \
                        where DATE(gp."createdAt") between '${startDate}' and '${endDate}' \
                        group by "firstname", \
                          "lastname", \
                          gp."username" \
                        order by wins desc, pushes desc, losses`;

  var leaderboard = await db.sequelize.query(leaderboard_query, {   
    type: db.sequelize.QueryTypes.SELECT
  });
  return res.status(200).json(leaderboard)
}

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