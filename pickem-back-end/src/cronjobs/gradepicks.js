import { response } from 'express';

const cron = require('node-cron');
const db = require("../models");
const GroupPicks = db.group_picks;
const GradePicks = db.grade_picks;
const Op = db.Sequelize.Op;
// import request from 'request';
const axios = require('axios');
// import fetch from 'node-fetch'



// Schedule tasks to be run on the server.
var graderTask = cron.schedule('* * * * *', function() {
    grader();
});

function gradePick(pick_type, pick, results) {
    // console.log(pick.team_selected)
    if (pick.team_selected) {
        // try {        
            var team_selected_score = pick['team_selected'].includes('1') ? results['team1Score'] : results['team2Score'];
            var team_other_score = pick['team_selected'].includes('1') ? results['team2Score'] : results['team1Score'];
            var spread_val = pick['spread'].includes('-') ? pick['spread'].replace('-',''):pick['spread'].replace('+','')
            var sp_calc = pick['spread'].includes('-') ? team_selected_score-team_other_score : team_other_score-team_selected_score
            console.log(team_selected_score, team_other_score, 'sp',sp_calc);
            if (pick['spread'].includes('-')) {
                if (sp_calc>spread_val) {
                    return 1
                    }
                else if (sp_calc === spread_val) {
                    return 0
                    }
                else {
                    return -1
                    }        
                }
            else if (pick['spread'].includes('+')) {
                if (sp_calc<spread_val) {
                    return 1
                    }
                else if (sp_calc === spread_val) {
                    return 0
                    }
                else {
                    return -1
                    }        
                }
        // }
        // catch {
        //     // pk pick
        //     console.log('into the catch...')
        //     team_selected_score = pick['team_selected'].includes('1') ? results['team1Score'] : results['team2Score'];
        //     team_other_score = pick['team_selected'].includes('1') ? results['team2Score'] : results['team1Score'];
        //     if (team_selected_score>team_other_score) {
        //         return 1
        //     }
        //     else if (team_selected_score===team_other_score) {
        //         return 0
        //     }
        //     else {
        //         return -1
        //     }
        // }
    }
    else if (pick.overUnder) {
        var total = results['team1Score']+results['team2Score']
        if (pick_type ==='over') {
            if (total>pick.overUnder) {
                return 1
            }
            else if (total===pick.overUnder) {
                return 0
            }
            else {
                return -1
            }
        }
        else if (pick_type === 'under') {
            if (total<pick.overUnder) {
                return 1
            }
            else if (total===pick.overUnder) {
                return 0
            }
            else {
                return -1
            }
        }
    }
    else {
        return 'ERROR GRADING! NO VALID PICK TYPE PASSED!'
    }

}
async function hitOddsAPI(pick_entries) {
    // console.log('inside ODDS API', gameID)
    // try {
    //     const response = await axios.get(`https://areyouwatchingthis.com/api/odds.json?sport=nfl&gameID=${gameID}`);
    //     return response.data;
    //     // if (response.status === 200) {
    //     // return await response.data
    // }
    // catch (err) {
    //     console.log(err);
    // }
    // }
    let game_result_arr = {};
    await Promise.all(pick_entries.map(([pick_type,raw_game]) =>      
        axios.get(`https://areyouwatchingthis.com/api/odds.json?sport=nfl&gameID=${JSON.parse(raw_game).gameID}`)
            .then(res => {
                game_result_arr[pick_type] = res.data.results[0];
            })
            .catch(err => {
                console.log(err);
            })
        ));
    return game_result_arr;
}


function grader() {
    console.log('running a task every minute');

    // GradePicks.findAll({
    //     where: {is_graded: 0},
    //     raw: true     
    //   }).then(data => {
    //     var picks_not_graded = data;
    //     console.log("picks_not_graded gathered...");
    //   });

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
    // console.log('query1');
    GroupPicks.hasOne(GradePicks, {foreignKey:"pick_id"});
    GradePicks.belongsTo(GroupPicks, {foreignKey: "pick_id"});
    GroupPicks.findAll({
        // where: {name: "Sunshine"},
        raw: true,
        include: {
            model: GradePicks,
            // as: 'GradePicks',
            where: {
              is_graded: {
                [Op.ne]: 1
              }
            },
            attributes:[]
        },
        attributes: [
            'group_picks.pick_id',
            'group_picks.favorite',
            'group_picks.underdog',
            'group_picks.over',
            'group_picks.under',
            'group_picks.lock',
        ]
      }).then(picks => {
        /* ... */
        // console.log(picks)
        picks.forEach(function (item, index) {
            // var pick = JSON.parse(item);
            // console.log(item)
            delete item['pick_id'];
 
            hitOddsAPI(Object.entries(item))
                .then(res => {
                    // console.log('going');
                    // var pick = res;
                    for (const [pick_type, game_result] of Object.entries(res)) {
                        // console.log(pick_type, game_result)
                        var pick = JSON.parse(item[pick_type]);
                        // console.log(pick);
                        var grade = gradePick(pick_type, pick, game_result);
                        // console.log(grade);
                        var score = {'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':game_result.team1Score, 'team2Score':game_result.team2Score,'val':pick.spread||pick.overUnder, 'grade':grade}
                        console.log(score)
                        };
                });
            // for (const [pick_type, pick] of Object.entries(game_result_dict)) {
            //     // console.log(pick_type, pick);
            //     var grade = gradePick(pick_type, pick, game_result)
            //         // // console.log(pick);
            //     var score = {'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':game_result.team1Score, 'team2Score':game_result.team2Score,'val':pick.spread||pick.overUnder, 'grade':grade}
            //     console.log(score)
            // }
            //         // let game_result = res.results[0];
            //         // var grade = gradePick(pick_type, pick, game_result)
            //         // // console.log(pick);
            //         // var score = {'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':game_result.team1Score, 'team2Score':game_result.team2Score,'val':pick.spread||pick.overUnder, 'grade':grade}
            //         // console.log(score)
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
            // for (const [pick_type, pick_raw] of Object.entries(item)) { 
            //     if (pick_type!=='pick_id') {  

            //         var pick = JSON.parse(pick_raw);
            //         console.log("RETRIEVING:", pick.gameID);
                    // console.log(pick_type,pick_raw)
                    // console.log(`https://areyouwatchingthis.com/api/odds.json?sport=nfl&gameID=${pick.gameID}`)          
                    // var game_result;
                    // var req = request(
                    //     { url: `https://areyouwatchingthis.com/api/odds.json?sport=nfl&gameID=${pick.gameID}`},
                    //     // { url: `https://areyouwatchingthis.com/api/odds.json?sport=nfl&gameID=509929`},
                    //     (error, response, body) => {
                    //         if (error || response.statusCode !== 200) {
                    //             return res.status(500).json({ type: 'error', message: err.message });
                    //         }
                    //         let res_json = JSON.parse(body);
                    //         game_result = res_json.results[0]
                    //         // return res_json.results[0]
                           
                    //         // var score = {'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':output.team1Score, 'team2Score':output.team2Score}
                    //         // console.log(score);
                    //         // res.send(JSON.parse(body));
                    //     }
                    // )

                    // 
                    //     // .then(jsonObject => ))
                    //TODO: only returns the last pick gameID. screws up other fcts
                    
                    // let game_result_promise = async () => {
                    //     var game_result = await axios.get('http://localhost:4000/app/expenseslist')
                    //   }
                    
                    // hitOddsAPI(pick.gameID)
                    //     .then(res => {
                    //         let game_result = res.results[0];
                    //         var grade = gradePick(pick_type, pick, game_result)
                    //         // console.log(pick);
                    //         var score = {'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':game_result.team1Score, 'team2Score':game_result.team2Score,'val':pick.spread||pick.overUnder, 'grade':grade}
                    //         console.log(score)
                    //     })
                    //     .catch(err => {
                    //         console.log(err);
                    //     });
                            // console.log(res.results[0])
                            // return res.results[0]
                            
                            
                        // })
                        // .catch(err => (console.log(err))
                        // );
                    // let game_result = () => {
                    //     game_result_promise
                    //         .then((g) => {
                    //             return g;
                    //         });
                    // };
                    
                    // var grade = gradePick(pick_type, pick, game_result())
                    // // console.log(pick);
                    // var score = {'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':game_result().team1Score, 'team2Score':game_result().team2Score,'val':pick.spread||pick.overUnder, 'grade':grade}
                    // console.log(score)
                    //     ).then(result => {
                    //     result
                    // })                    
                    
                    
                // }
            // }
            
          });
      });

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