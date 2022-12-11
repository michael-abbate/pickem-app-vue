<template>
    <div id="user-leaderboard">
        <h2>Users</h2>
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
            <tr v-for="user in users" :key = "user.email" class="team-row">
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.username }}</td>
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
            error: null  
        }
    },
    async created() {
        try {       
            const result = await LeaderboardService.leaderboard();
            const users = result.data;
            this.users = users;                                

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

table {
    margin: 0 auto;
}
</style>