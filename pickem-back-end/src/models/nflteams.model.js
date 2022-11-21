module.exports = (sequelize, Sequelize) => {
    const NFLTeams = sequelize.define("nfl_teams", {
      
      team_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      team_name: {
        type: Sequelize.STRING
      }
    },
    {
      // timestamps: false -> removes createdAt and updatedAt columns!
      timestamps: false,
    }
    );
  
    return NFLTeams;
  };