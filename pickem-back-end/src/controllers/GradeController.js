const db = require("../models");
const GradePicks = db.grade_picks;
// const GroupPicks = db.group_picks;
const Op = db.Sequelize.Op;

// Grade picks
exports.insertGradeRow = (req, res) => {
    var nflweek = req.body.nflweek
    console.log(`Gathering picks for ${nflweek} games...`)
    const group_pick = {
        favorite: req.body.favorite,
        underdog: req.body.underdog,
        over: req.body.over,
        under: req.body.under,
        lock: req.body.lock
    };
    const grade_pick = {
        favorite: null,
        underdog: null,
        over: null,
        under: null,
        lock: null,
        is_graded: 0
    };
    
    
    GradePicks.findOrCreate({
        where: {username: req.body.username, nfl_week: req.body.nflweek},
        defaults: grade_pick
      }).then(([pickRow, isCreated]) => {
        // console.log('Created:', isCreated)
        // console.log(pickRow)
        if(isCreated){
            // pick submitted
            console.log("Row for future grading submitted successfully");
            // res.send({
            //   message: "Row for future grading submitted successfully"
            // });
          }
        // else {
        //     // GRADE HERE   
        //     console.log('Row for grading found...');
        //     // TODO: check if row already grade
        //         //
        //     for (const [pick_type, pick] of Object.entries(group_pick)) {
        //         console.log(pick_type, pick.render_value, pick.game_id)
        //         res.send(
        //             [pick_type, pick.render_value, pick.game_id]
        //         )
        //     }                   
        // } 
        });

    
}