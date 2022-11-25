<template>
    <div id="nfl-teams">
        <!-- <div v-cloak v-for="team in nflteams" :key = "team.team_id"> -->
        <table class="nfl-teams">
            <th>
                Team ID
            </th>
            <th>
                Team Name
            </th>
            <tr v-for="team in nflteams" :key = "team.team_id" class="team-row">
                <td>{{ team.team_id }}</td>
                <td>{{ team.team_name }}</td>
            </tr>
        </table>
                    
        <!-- </div> -->
    </div>
</template>


<script>

import axios from 'axios';

export default {
    name: "NFLTeams",
    data() {
        return {            
            nflteams: [],       
        }
    },
    async created() {
        console.log("getting nfl teams")
        const result = await axios.get("/api/nflteams");
        const nflteams = result.data;
        this.nflteams = nflteams;
    }
}

</script>

<style scoped>

</style>