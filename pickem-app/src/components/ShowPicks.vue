<template>
    <div id="app">
        
        <div>
            selected picks: <strong>{{ picks }}</strong>
        </div>

        <table v-cloak v-for="(game,index) in games" :key = "game.gameID" :class="game.gameID+'game-table'">
            <tr :class="'away-row-'+index+'-'+game.gameID">
                <td class = "matchup-cell">
                    {{ game.team1Name }}                    
                </td>
                <!-- need to do a check for fav/dog and o/u -->
                <!-- hit the api to get the data then run the check mentioned above -->
                <td class="pickem-cell">          
                    <label :for="game.gameID+'-fav'"></label>
                    <input v-model="picks" type="checkbox" :id="game.gameID+'-fav'" :value="game.team1Name + sample_spread">
                    -{{ sample_spread }}
                </td>
                <td class="pickem-cell">
                    o{{ sample_ou }}
                </td>     
            </tr>        
            <tr :class="'home-row-'+index+'-'+game.gameID">
                <td v-text = "game.team2Name" class = "matchup-cell">
                </td>
                <td class="pickem-cell">
                    <label :for="game.gameID+'-dog'"></label>
                    <input v-model="picks" type="checkbox" :id="game.gameID+'-dog'" :value="game.team2Name + sample_spread">
                    +{{ sample_spread }}
                </td>
                <td v-text = "'u'+sample_ou" class="pickem-cell">                    
                </td>     
            </tr>             
        </table>
    </div>
</template>


<script>
import games_raw from '../gamessample.js'

let games = JSON.parse(JSON.stringify(games_raw)).results;

export default {
    // props: {
    //     games: Map
    // },
    data() {
        return {
            games,
            picks: [],                    
            sample_spread: 7,
            sample_ou: 48.5,
            editIndex: -1,
            fontSize: 15,
            textSizeControlStyle: {
                textAlign:'center',
                cursor: 'pointer'
            }
        }
    }
}

</script>

<style scoped>

table {
    margin: 0 auto;
    border-collapse:separate; 
    border-spacing:.5em!important;
    
}
.matchup-cell {
    padding-right:.5em;
    width: 5em;
}
.pickem-cell {
    padding: 15px;
    border:solid 2px dodgerblue;
    background: white;
    color: dodgerblue;
    margin: 0 auto;
    cursor: pointer;
    border-radius:5px;
    text-align:center;
    width: 6em;
    height:1em;
    font-size: 1.4vw;
}

.pickem-cell:hover  {
    background-color: dodgerblue;
    color:white;
    cursor:pointer;
}
</style>