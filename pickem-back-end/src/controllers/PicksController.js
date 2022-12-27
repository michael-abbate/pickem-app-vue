const db = require("../models");
const GroupPicks = db.group_picks;
const GradePicks = db.grade_picks;
const Op = db.Sequelize.Op;
const cron = require('node-cron');
var crypto = require('crypto');


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({
        message: "Please log in to submit picks!"
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
      lock: req.body.lock,
      pick_id: crypto.createHash('sha256').update(req.body.pick_id).digest('hex')
      };
    
    var picks_arr = [];
    for (const [pick_type, pick_value] of Object.entries(group_pick)) {
      if (pick_type !=="pick_id") {
        picks_arr.push(pick_value);    
      }    
    }

    const picks_set = new Set(picks_arr);
    if (picks_set.has('""')) {      
      res.status(400).send({        
        message: "Please fill out all pick types!"
      });
      return;
    }
    if (picks_set.size !== 5) {      
      res.status(400).send({        
        message: "Duplicate picks found!"
      });
      return;
    }

    GroupPicks.findOrCreate({
      where: {username: req.body.username, nfl_week: req.body.nflweek},
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

    const grade_pick = {
        favorite: null,
        underdog: null,
        over: null,
        under: null,
        lock: null,        
        is_graded: 0,
        pick_id: crypto.createHash('sha256').update(req.body.pick_id).digest('hex')
    };    
    
    GradePicks.findOrCreate({
        where: {username: req.body.username, nfl_week: req.body.nflweek},
        defaults: grade_pick
      }).then(([pickRow, isCreated]) => {
        if(isCreated) {
            console.log("Row for future grading submitted successfully");
          }
      });
    
};  

 // Retrieve all Users' Picks from the database.
exports.findWeeksPicks = (req, res) => {
  // console.log(req)
  if (!req.body.nflweek) {
    console.log('inside no nfl week part')
    GroupPicks.findAll({
      attributes: [
          [db.Sequelize.fn('max', db.Sequelize.col('createdAt')), 'max'], 'nfl_week'
      ],
      group: ['nfl_week'],
      order: [
        ['max', 'DESC'] //sequelize renames the col max instead of createdAt, so have to order by "max"
      ]
    }).then((mostRecentCreationDate) => {
      if (mostRecentCreationDate.length>0) {
        console.log(mostRecentCreationDate)
        var nflweek = mostRecentCreationDate[0].dataValues.nfl_week 
        console.log(`Gathering picks for ${nflweek} games...`)
        var condition = nflweek ? { nfl_week: { [Op.iLike]: `%${nflweek}%` } } : null;

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
    }
    else {
      console.log("No WEEK found in DB!")
    }
  });
  }
  else {
    console.log('inside other part')
    var nflweek = req.body.nflweek
    console.log(`Gathering picks for ${nflweek} games...`)
    var condition = nflweek ? { nfl_week: { [Op.iLike]: `%${nflweek}%` } } : null;

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

  }

}

exports.findDistinctWeeks = (req, res) => {
  GroupPicks.findAll({
      attributes: [
          // specify an array where the first element is the SQL function and the second is the alias
          [db.Sequelize.fn('DISTINCT', db.Sequelize.col('nfl_week')) ,'nfl_week']
          //, specify any additional columns, e.g. country_code
      ]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    console.log("DISTINCT WEEKS ERROR")
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving NFL weeks."
    });
  })
};

  // Currently getting most recent submission and grabbing that date... might be more efficient to grab most recent date, then in 
  // next query pass that date to get most recent NFL week, then in next query run findAll using that week?
  // const nflweek = ''
  // console.log(nflweek);
  // // const nflweek = req.query.nflweek
  // console.log(`Gathering picks for ${req.query.nflweek} games...`)
  // const group_picks = req.query.group_picks;

// exports.findWeeksPicks = (req, res) => {
//   // const nflweek = findCurrentWeek();
//   console.log(`Gathering picks for ${nflweek} games...`)
//   var condition = nflweek ? { nfl_week: { [Op.iLike]: `%${nflweek}%` } } : null;

//   GroupPicks.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving group picks."
//       });
//     });
// };



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