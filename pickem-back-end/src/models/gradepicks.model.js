module.exports = (sequelize, Sequelize) => {
    const GradePicks = sequelize.define("grade_picks", {
      nfl_week: {
        type: Sequelize.STRING(100),        
      },
      username: {
        type: Sequelize.STRING(500),        
      },
      favorite: {
        type: Sequelize.INTEGER,
      },
      underdog: {
        type: Sequelize.INTEGER
      },
      over: {
        type: Sequelize.INTEGER
      },
      under: {
        type: Sequelize.INTEGER
      },
      lock: {
        type: Sequelize.INTEGER
      },
      is_graded: {
        type: Sequelize.INTEGER
      }
    });
  
    return GradePicks;
  };