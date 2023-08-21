module.exports = (sequelize, Sequelize) => {
    const NFLSeasons = sequelize.define("nfl_seasons", {
      
      nfl_season: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      }
    },
    {
      // timestamps: false -> removes createdAt and updatedAt columns!
      timestamps: false,
    }
    );
  
    return NFLSeasons;
  };