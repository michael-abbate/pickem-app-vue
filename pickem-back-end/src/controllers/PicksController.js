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
      nfl_week: req.body.nflweek,
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
      if (pick_type !=="pick_id" & pick_type!='nfl_week') {
        picks_arr.push(pick_value);    
      }    
    }

    const picks_set = new Set(picks_arr);
    console.log("PICKS SET:", picks_set)
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
      where: {username: req.body.username, pick_id: group_pick.pick_id},
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
        nfl_week: req.body.nflweek,
        favorite: null,
        underdog: null,
        over: null,
        under: null,
        lock: null,        
        is_graded: 0,
        pick_id: crypto.createHash('sha256').update(req.body.pick_id).digest('hex')
    };    
    
    GradePicks.findOrCreate({
        where: {username: req.body.username, pick_id: group_pick.pick_id},
        defaults: grade_pick
      }).then(([pickRow, isCreated]) => {
        if(isCreated) {
            console.log("Row for future grading submitted successfully");
          }
      })
        .catch(err => {
          console.log(`ERROR WHEN SUBMITTING GRADES for ${req.body.username}:`, err)
        });
    
};  

// Using static dates for now for 2023-2024 season
// const startDate = new Date("2023-07-12 00:00:00");
// const endDate = new Date();
 // Retrieve all Users' Picks from the database.
exports.findWeeksPicks = async (req, res) => {
  var selected_season = req.body.selected_season
  var date_range = await db.sequelize.query(`SELECT * FROM nfl_seasons WHERE nfl_season = '${selected_season}'`, {   
    type: db.sequelize.QueryTypes.SELECT
  });

  var startDate = date_range[0]['start_date'].toISOString().split('T')[0]
  var endDate = date_range[0]['end_date'].toISOString().split('T')[0]
  console.log('Retrieving leaderboard for', startDate, 'to', endDate)

  GroupPicks.hasOne(GradePicks, {foreignKey:"pick_id"});
  GradePicks.belongsTo(GroupPicks, {foreignKey: "pick_id"});

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
        var condition = nflweek ? { nfl_week: { [Op.iLike]: `%${nflweek}%` }, createdAt: {[Op.between]:  [startDate, endDate]}} : null;
        GroupPicks.findAll(
          { where: condition ,
          include: {
            model: GradePicks,
            // as: 'GradePicks',
            // where: {
            //   favorite: {
            //     [Op.not]: null
            //   },
            //   underdog: {
            //     [Op.not]: null
            //   },
            //   over: {
            //     [Op.not]: null
            //   },
            //   under: {
            //     [Op.not]: null
            //   },
            //   lock: {
            //     [Op.not]: null
            //   }
            // },
            attributes:[
                          ['favorite', 'favorite_grade'],
                          ['underdog', 'underdog_grade'],
                          ['over', 'over_grade'],
                          ['under', 'under_grade'],
                          ['lock', 'lock_grade']
                      ]

            }
          }
          )
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
    var condition = nflweek ? { nfl_week: { [Op.iLike]: `%${nflweek}%` }, createdAt: {[Op.between]:  [startDate, endDate]}} : null;

    GroupPicks.findAll(
      { where: condition ,
      include: {
        model: GradePicks,
        // as: 'GradePicks',
        // where: {
        //   favorite: {
        //     [Op.not]: null
        //   },
        //   underdog: {
        //     [Op.not]: null
        //   },
        //   over: {
        //     [Op.not]: null
        //   },
        //   under: {
        //     [Op.not]: null
        //   },
        //   lock: {
        //     [Op.not]: null
        //   }
        // },
        attributes:[
                      ['favorite', 'favorite_grade'],
                      ['underdog', 'underdog_grade'],
                      ['over', 'over_grade'],
                      ['under', 'under_grade'],
                      ['lock', 'lock_grade']
                  ]

        }
      }
      )
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

exports.findDistinctWeeks = async (req, res) => {
  var selected_season = req.body.selected_season
  var date_range = await db.sequelize.query(`SELECT * FROM nfl_seasons WHERE nfl_season = '${selected_season}'`, {   
    type: db.sequelize.QueryTypes.SELECT
  });

  var startDate = date_range[0]['start_date'].toISOString().split('T')[0]
  var endDate = date_range[0]['end_date'].toISOString().split('T')[0]
  console.log('Retrieving leaderboard for', startDate, 'to', endDate)
  
  GroupPicks.findAll({
      where: { createdAt: {[Op.between]:  [startDate, endDate]} },
      order: [
        ['nfl_week', 'ASC']
      ],
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