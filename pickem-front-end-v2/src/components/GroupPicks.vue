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
            <div class = "pick-tables-wrapper">
                <table v-for="pick in picks" :key = "pick.username" class="pick-table">
                    <tr class = "username-row-header">
                        <th colspan = "3" :style="checkForJonny(pick.username)">
                            <span>{{ pick.username }} </span>
                            <br>                        
                            <span class = "pick-record">{{ generateRecord(pick) }}</span>
                        </th>
                    </tr>
                    <tr>
                        <td>     
                            <span v-if="pick.grade_pick.favorite_grade === 1"><i  class="fa-solid fa-circle-check"></i></span>
                            <span v-else-if="pick.grade_pick.favorite_grade === -1"><i  class="fa-solid fa-circle-xmark"></i></span>                 
                            <span v-else-if="pick.grade_pick.favorite_grade === 0"><i  class="fa-solid fa-circle-minus"></i></span>                 
                            <span v-else><i  class="fa-regular fa-circle"></i></span>
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
                            <span v-if="pick.grade_pick.underdog_grade === 1"><i  class="fa-solid fa-circle-check"></i></span>
                            <span v-else-if="pick.grade_pick.underdog_grade === -1"><i  class="fa-solid fa-circle-xmark"></i></span>                 
                            <span v-else-if="pick.grade_pick.underdog_grade === 0"><i  class="fa-solid fa-circle-minus"></i></span>                 
                            <span v-else><i  class="fa-regular fa-circle"></i></span>                
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
                            <span v-if="pick.grade_pick.over_grade === 1"><i  class="fa-solid fa-circle-check"></i></span>
                            <span v-else-if="pick.grade_pick.over_grade === -1"><i  class="fa-solid fa-circle-xmark"></i></span>                 
                            <span v-else-if="pick.grade_pick.over_grade === 0"><i  class="fa-solid fa-circle-minus"></i></span>                 
                            <span v-else><i  class="fa-regular fa-circle"></i></span>                               
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
                            <span v-if="pick.grade_pick.under_grade === 1"><i  class="fa-solid fa-circle-check"></i></span>
                            <span v-else-if="pick.grade_pick.under_grade === -1"><i  class="fa-solid fa-circle-xmark"></i></span>                 
                            <span v-else-if="pick.grade_pick.under_grade === 0"><i  class="fa-solid fa-circle-minus"></i></span>                 
                            <span v-else><i  class="fa-regular fa-circle"></i></span>
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
                            <span v-if="pick.grade_pick.lock_grade === 1"><i  class="fa-solid fa-circle-check"></i></span>
                            <span v-else-if="pick.grade_pick.lock_grade === -1"><i  class="fa-solid fa-circle-xmark"></i></span>                 
                            <span v-else-if="pick.grade_pick.lock_grade === 0"><i  class="fa-solid fa-circle-minus"></i></span>                 
                            <span v-else><i  class="fa-regular fa-circle"></i></span>
                        </td>
                        <td>
                            Lock
                        </td>
                        <td v-html="parsePick(pick.lock).render_value">            
                        </td>
                    </tr>
                </table>
            </div>
        </div>                    
    </div>
</template>


<script>

// import axios from 'axios';
import PicksService from '@/services/PicksService';
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch() 

export default {
    name: "GroupPicks",
    data() {
        return {
            nflweek: '',  
            distinct_nflweeks: [],          
            picks: [],     
            error: null,
            color:'white'
            // grades:[]
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
        , checkForJonny(username) {
            let color = '';
            if (username === "Breakfastbuffet") {
                color = '#F9629F';
            }
            else if (username === 'cornsoupyellow') {
                color = '#512888'
            }
            else {
                color='white';
            }
            return { color };
        }
        , generateRecord(pick) {
            var grade_json = pick.grade_pick;
            var grades = [];            
            for (let key in grade_json) {
                var grade = grade_json[key];                
                grades.push(grade);
            }            
            var wins = grades.filter(obj => obj === 1).length
            var losses = grades.filter(obj => obj === -1).length
            var pushes = grades.filter(obj => obj === 0).length
            return wins+"-"+losses+"-"+pushes;
        }
        
    }
}

</script>

<style scoped>
@media (pointer:fine) {
    #group-picks {
        display:flex;
        justify-content:center;
    }

    .pick-tables-wrapper {
        display:grid;
        grid-template-columns: 1fr 1fr 1fr;
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

    .pick-record {
        font-size:.8vw;
    }
    .fa-circle-check{
        color:#39FF14;
    }
    .fa-circle-xmark {
        color:red;
    }
    
}
@media (pointer:coarse) {
    #group-picks {
        display:flex;
        justify-content:center;
    }

    .pick-tables-wrapper {
        display:grid;
        grid-template-columns: 1fr;
    }

    .pick-table {
        border: 2px solid dodgerblue;
        margin: 25px;
        border-radius:15px;
        border-spacing: 0;
    }

    th {
        padding:10px;
        color:white;
        font-size:4.50vw;
    }
    td {
        padding:10px;
        font-weight: bold;
        text-align:left;
        font-size:4vw;
    }
    select {
        background-color: #fff;
        font-weight: bold;
        font-size: 4vw;
        border-radius: 8px;
        border-color:white;
        color:#1f1f1f;
        height:8vw;
        width:25vw;
        text-align: center;
    }
    .pick-record {
        font-size:3vw;
    }
    .fa-circle-check{
        color:#39FF14;
    }
    .fa-circle-xmark {
        color:red;
    }
}

</style>