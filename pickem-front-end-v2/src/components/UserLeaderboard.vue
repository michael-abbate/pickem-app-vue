<template>
    <div id="user-leaderboard">
        <h2>Leaderboard</h2>
        <select v-model="selected_season" @change = "getLeaderboard(selected_season)">
            <option v-for="(season) in nflseasons" :key="season">
                {{ season }}
            </option>
        </select>
        <!-- <div v-cloak v-for="team in nflteams" :key = "team.team_id"> -->
        <table class="leaderboard">
            <th>
                First Name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Username
            </th>
            <th>
                Record
            </th>
            <tr v-for="user in users" :key = "user.email" class="team-row">
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.wins }}-{{ user.losses }}-{{ user.pushes }}</td>
            </tr>
        </table>                    
    </div>
</template>


<script>

// import axios from 'axios';
import LeaderboardService from '@/services/LeaderboardService';

export default {
    name: "UserLeaderboard",
    data() {
        return {            
            users: [],    
            nflseasons: ["2022-2023", "2023-2024"],
            selected_season: '2023-2024',
            error: null 
        }
    },
    async created() {
        try {       
            const result = await LeaderboardService.postLeaderboard({selected_season:'2023-2024'});
            const users = result.data;
            this.users = users;                                

        } catch(error) {
            this.error = error.response.data.error

        }
    },
    methods: {    
        getLeaderboard(selected_season) {
            console.log("getLeaderboard fct")
            try {                       
                var nflseason_json = {selected_season: selected_season}
                LeaderboardService.postLeaderboard(nflseason_json)
                    .then((leaderboard_result) => {
                        var users = leaderboard_result.data;
                        this.users = users;                        
                    }).catch(err => {                        
                        console.log("Some error occurred while retrieving the leaderboard.")
                        this.error = err.response.data.error
                    });
            } catch(error) {
                this.error = error.response.data.error
            }
        }
    }
    //     async register() {
    //         try {       
    //             const result = await LeaderboardService.leaderboard();
    //             const users = result.data;
    //             this.users = users;                                

    //         } catch(error) {
    //             this.error = error.response.data.error

    //         }

    //     }
    // }
}

</script>

<style scoped>
table {
        margin: 0 auto;
        padding:20px;
    }
@media(pointer:fine) {
    
    th {
        padding: 5px;
    }
    td {
        padding:3px;
    }
    select {
        background-color: #fff;
        font-weight: bold;
        font-size: 1vw;
        border-radius: 8px;
        border-color:white;
        color:#1f1f1f;
        height:2vw;
        width:12vw;
        text-align: center;
        margin-bottom:10px;
    }

    select:hover {
        cursor: pointer;
    }
}
@media (pointer:coarse){
    
    select {
        background-color: #fff;
        font-weight: bold;
        font-size: 3vw;
        border-radius: 8px;
        border-color:white;
        color:#1f1f1f;
        height:8vw;
        width:36vw;        
        text-align-last:center;
    }
}
</style>