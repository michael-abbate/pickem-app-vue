module.exports = (sequelize, Sequelize) => {
    const GroupPicks = sequelize.define("group_picks", {
      nfl_week: {
        type: Sequelize.STRING,        
      },
      username: {
        type: Sequelize.STRING,        
      },
      favorite: {
        type: Sequelize.STRING
      },
      underdog: {
        type: Sequelize.STRING
      },
      over: {
        type: Sequelize.STRING
      },
      under: {
        type: Sequelize.STRING
      },
      lock: {
        type: Sequelize.STRING
      },
      pick_json: {
        type: Sequelize.STRING(1000)
      }
    });
  
    return GroupPicks;
  };