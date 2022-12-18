const cron = require('node-cron');
const db = require("../models");
const GroupPicks = db.group_picks;
const GradePicks = db.grade_picks;
const Op = db.Sequelize.Op;

// Schedule tasks to be run on the server.
var graderTask = cron.schedule('* * * * *', function() {
    grader();
});

function grader() {
    console.log('running a task every minute');

    GradePicks.findAll({
        where: {is_graded: 0},
        raw: true     
      }).then(data => {
        var picks_not_graded = data;
        console.log(picks_not_graded);
      });

      // ^ above returns:
    //   [
    //     {
    //       id: 1,
    //       nfl_week: 'Week 15',
    //       username: 'migs',
    //       favorite: null,
    //       underdog: null,
    //       over: null,
    //       under: null,
    //       lock: null,
    //       is_graded: 0,
    //       createdAt: 2022-12-18T00:00:53.631Z,
    //       updatedAt: 2022-12-18T00:00:53.631Z
    //     },
    //     {
    //       id: 2,
    //       nfl_week: 'Week 15',
    //       username: 'test_username',
    //       favorite: null,
    //       underdog: null,
    //       over: null,
    //       under: null,
    //       lock: null,
    //       is_graded: 0,
    //       createdAt: 2022-12-18T00:04:21.837Z,
    //       updatedAt: 2022-12-18T00:04:21.837Z
    //     }
    //   ]

    // TODO: loop through each ungraded pick, 
    // find respective row in GroupPicks table
    // loop through each pick type within user's pickem
    // hit API using game ID and grade pick --> Update the GradePicks table with grade
    // continue.


      // GroupPicks.findAll({ where: condition })
    //     .then(data => {
    //         res.send(data);
    //         })
    //     .catch(err => {
    //         console.log("error occured:", err);
    //         // res.status(500).send({
    //         //     message:
    //         //     err.message || "Some error occurred while retrieving group picks."
    //         // });
    // });
}

export { graderTask };