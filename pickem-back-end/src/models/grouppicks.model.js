module.exports = (sequelize, Sequelize) => {
    const GroupPicks = sequelize.define("group_picks", {
      nfl_week: {
        type: Sequelize.STRING(1000),        
      },
      username: {
        type: Sequelize.STRING(1000),        
      },
      favorite: {
        type: Sequelize.STRING(1000)
      },
      underdog: {
        type: Sequelize.STRING(1000)
      },
      over: {
        type: Sequelize.STRING(1000)
      },
      under: {
        type: Sequelize.STRING(1000)
      },
      lock: {
        type: Sequelize.STRING(1000)
      }
    });
  
    return GroupPicks;
  };