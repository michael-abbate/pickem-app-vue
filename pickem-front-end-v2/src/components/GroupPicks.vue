<template>
    <div id="group-picks">
        <!-- <div v-cloak v-for="team in nflteams" :key = "team.team_id"> -->
        <table class="picks">
            <th>
                NFL Week
            </th>
            <th>
                Username
            </th>
            <th>
                Favorite
            </th>
            <th>
                Underdog
            </th>
            <th>
                Over
            </th>
            <th>
                Under
            </th>
            <th>
                Lock
            </th>
            <tr v-for="pick in picks" :key = "pick.username" class="pick-row">
                <td>{{ pick.nfl_week }}</td>
                <td>{{ pick.username }}</td>
                <td>{{ pick.favorite }}</td>
                <td>{{ pick.underdog }}</td>
                <td>{{ pick.over }}</td>
                <td>{{ pick.under }}</td>
                <td>{{ pick.lock }}</td>
            </tr>
        </table>                    
    </div>
</template>


<script>

// import axios from 'axios';
import PicksService from '@/services/PicksService';

export default {
    name: "GroupPicks",
    data() {
        return {            
            picks: [],     
            error: null  
        }
    },
    async created() {
        try {       
            const result = await PicksService.getGroupPicks();
            const picks = result.data;
            this.picks = picks;                                

        } catch(error) {
            this.error = error.response.data.error
        }
    },
    // methods: {        
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

#group-picks {
    display:flex;
    justify-content:center;
}
th {
    padding:10px;
}
td {
    padding:10px
}

</style>