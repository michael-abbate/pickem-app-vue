<template>
    <div id="group-picks">
        <div>
            <h2>
                {{ nflweek }} Picks
            </h2>
            <select v-model="nflweek" @change = "getWeeksPicks(nflweek)">
                <option v-for="(distinct_nflweek) in distinct_nflweeks" :key="distinct_nflweek">
                    {{ distinct_nflweek.nfl_week }}
                </option>
            </select>
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
                        {{ parsePick(pick.favorite).render_value }}
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
                        {{ parsePick(pick.underdog).render_value }}
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
                        {{ parsePick(pick.over).render_value }}
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
                        {{ parsePick(pick.under).render_value }}
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
                        {{ parsePick(pick.lock).render_value }}
                    </td>
                </tr>
                
                
            </table>
        </div>                    
    </div>
</template>


<script>

// import axios from 'axios';
import PicksService from '@/services/PicksService';

export default {
    name: "GroupPicks",
    data() {
        return {
            nflweek: '',  
            distinct_nflweeks: [],          
            picks: [],     
            error: null  
        }
    },
    async created() {
        try {       
            const weeksresult = await PicksService.getDistinctWeeks();
            this.distinct_nflweeks = weeksresult.data;
            // var nflweek_json = {nflweek: false}
            const picksresult = await PicksService.getGroupPicks();
            const picks = picksresult.data;
            this.picks = picks;
            this.nflweek = picks[0].nfl_week;

        } catch(error) {
            this.error = error.response.data.error
        }
    },
    methods: {    
        parsePick(pick) {                    
            return JSON.parse(pick)        
        }
        ,
        getWeeksPicks(nflweek) {
            console.log("getWeeksPicks fct")
            try {                       
                var nflweek_json = {nflweek: nflweek}
                PicksService.postGroupPicks(nflweek_json)
                    .then((picksresult) => {
                        var picks = picksresult.data;
                        this.picks = picks;                        
                    }).catch(err => {                        
                        console.log("Some error occurred while retrieving group picks.")
                        this.error = err.response.data.error
                    });
            } catch(error) {
                this.error = error.response.data.error
            }
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
select {
    background-color: #fff;
    font-weight: bold;
    font-size: 1vw;
    border-radius: 8px;
    border-color:white;
    color:#1f1f1f;
    height:2vw;
    width:10vw;
    text-align: center;
    margin-bottom:10px;
}

select:hover {
    cursor: pointer;
}

</style>