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
    if (pick.team_selected) {
        if (!pick['spread'].includes('pk')) {
            var team_selected_score = pick['team_selected'].includes('1') ? results['team1Score'] : results['team2Score'];
            var team_other_score = pick['team_selected'].includes('1') ? results['team2Score'] : results['team1Score'];
            var spread_val = pick['spread'].includes('-') ? pick['spread'].replace('-',''):pick['spread'].replace('+','')
            var sp_calc = pick['spread'].includes('-') ? team_selected_score-team_other_score : team_other_score-team_selected_score
            // console.log(team_selected_score, team_other_score, 'sp',sp_calc);
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
        }
        else {        
            // pk pick
            console.log('matchup was a pickem...')
            team_selected_score = pick['team_selected'].includes('1') ? results['team1Score'] : results['team2Score'];
            team_other_score = pick['team_selected'].includes('1') ? results['team2Score'] : results['team1Score'];
            if (team_selected_score>team_other_score) {
                return 1
            }
            else if (team_selected_score===team_other_score) {
                return 0
            }
            else {
                return -1
            }
        }
    }
    else if (pick.overUnder) {
        var total = results['team1Score']+results['team2Score']
        if (pick_type ==='over' || pick_type === 'lock') {
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
        else if (pick_type === 'under' || pick_type === 'lock') {
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

async function hitOddsAPI(pick_id, pick_entries) {
    let grades = [];
    await Promise.all(pick_entries.map(([pick_type,raw_pick]) =>      
        axios.get(`https://areyouwatchingthis.com/api/odds.json?sport=nfl&gameID=${JSON.parse(raw_pick).gameID}`)
            .then(res => {
                var game_result = res.data.results[0];
                var pick = JSON.parse(raw_pick);
                // Make sure the game is over before grading
                if (game_result['timeLeft'] === 'Final') {
                    var grade = gradePick(pick_type, pick, game_result);
                    var grade_json = {'pick_id':pick_id, 'pick_type':pick_type, 'team_selected':pick.team_selected, 'team1Score':game_result.team1Score, 'team2Score':game_result.team2Score,'val':pick.spread||pick.overUnder, 'grade':grade}                    
                    grades.push(grade_json);
                }
            })
            .catch(err => {
                console.log(err);
            })
        ));
    return grades;
}

async function updateGrade(grade_json) {
    var updater = {}
    updater[grade_json['pick_type']] = grade_json['grade']
    var filters = {}
    filters[grade_json['pick_type']] = null
    filters['pick_id'] = grade_json['pick_id']
    await GradePicks.update(        
        updater, 
        {
            where: filters
        })
        .then((result) => {
            console.log(result[0], "grade updated!")
        })
        .catch(err => {
            console.log("Error updating pick's grade!", err)
        });;
}


function grader() {
    console.log('running a task every minute');
    GroupPicks.hasOne(GradePicks, {foreignKey:"pick_id"});
    GradePicks.belongsTo(GroupPicks, {foreignKey: "pick_id"});
    console.log("GRADING...");
    GroupPicks.findAll({
        // where: {name: "Sunshine"},
        raw: true,
        include: {
            model: GradePicks,
            // as: 'GradePicks',
            where: {
              is_graded: {
                [Op.eq]: 0
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
            // picks returns an array of picks, within each pick is the pick ID col, fav col, underdog col, etc.
            picks.forEach(function (item, index) {
                var pick_id = item['pick_id'];
                delete item['pick_id'];    
                hitOddsAPI(pick_id, Object.entries(item))
                    .then(res => {      
                        var grade_json_arr = res;
                        grade_json_arr.forEach(function (grade_json, index) {
                            updateGrade(grade_json);
                        });                        
                    })
                    .catch(err => {
                        console.log("Error in hitting OddsAPI to retrieve scores:", err);
                    });           
          });
      });

    console.log("Marking rows as graded...");
    GradePicks.update(        
        {
            is_graded: 1
        }, 
        {
            where: {
                is_graded: 0,
                favorite: {[Op.not]: null},
                underdog: {[Op.not]: null},
                over: {[Op.not]: null},
                under: {[Op.not]: null},
                lock: {[Op.not]: null}
            }
        })
        .then((result) => {
            console.log(result[0], "rows updated!")
        })
        .catch(err => {
            console.log("Error updating grades table!", err)
        });
}

export { graderTask };