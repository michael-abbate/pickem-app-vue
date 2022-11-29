<template>
    <div id="group-picks">
        <!-- <div v-cloak v-for="team in nflteams" :key = "team.team_id"> -->
        <table v-for="pick in picks" :key = "pick.username" class="pick-table">
            <tr class = "username-row-header">
                <th colspan = "3">{{ pick.username }}</th>
            </tr>
            <tr>
                <td>
                    &#9711;
                </td>
                <td>
                    Favorite
                </td>
                <td>
                    {{ pick.favorite }}
                </td>
            </tr>
            <tr>
                <td>
                    &#9711;
                </td>
                <td>
                    Underdog
                </td>
                <td>
                    {{ pick.underdog }}
                </td>
            </tr>
            <tr>
                <td>
                    &#9711;
                </td>
                <td>
                    Over
                </td>
                <td>
                    {{ pick.over }}
                </td>
            </tr>
            <tr>
                <td>
                    &#9711;
                </td>
                <td>
                    Under
                </td>
                <td>
                    {{ pick.under }}
                </td>
            </tr>
            <tr>
                <td>
                    &#9711;
                </td>
                <td>
                    Lock
                </td>
                <td>
                    {{ pick.lock }}
                </td>
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
    }
}

</script>

<style scoped>

#group-picks {
    display:flex;
    justify-content:center;
}

.pick-table {
    border: 2px solid dodgerblue;
    margin: 15px;
    /* border-collapse: collapse; */
    border-radius:15px;
    border-spacing: 0;
}

th {
    padding:10px;
    color:white;
    font-size:1.30vw;
    
}
td {
    padding:10px;
    font-weight: bold;
    text-align:left;
}

</style>