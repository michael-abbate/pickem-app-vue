<template>
    <div class = "selected-picks-container">
        <table class="select-picks-table">
            <tr v-for="(type,i) in types_of_picks" :key="i" :class="type+'-row'">
                <td>
                    {{ type }}
                </td>
                <td>
                    <select>
                        <option value="" disabled selected>Select {{ type }}</option>
                        <option v-for="(pick,index) in picks"
                            :key = "index"
                            :id="pick+'submitted-picks'">
                            {{ pick }}
                        </option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// import router from '../router'

//TODO: IF SELEECTED FROM PICKS, REMOVE FROM THE LIST!
export default {
    name: 'SelectedPicks',
    data() {
       return {
           picks:null,
           types_of_picks: ['Favorite','Underdog','Over','Under','LOCK']
       } 
    },
    mounted() {
        this.picks = this.$route.params.picks;
    }
};
</script>

<style scoped>
table {
    margin: 0 auto;
    font-size: 2vw;
    border-collapse:separate; 
    border-spacing:1em!important;
    color:#fff;
    text-align: left;
}
/* 
select {
    height:1.75em;
    width:10em;
    font-size: 1.5vw;
    border-radius:15px;
    /* padding: 5px; */
/* }
*/

select {
    background-color: #fff;
    font-size: 1vw;
    border-radius: 8px;
    border-color:white;
    color:#1f1f1f;
    height:3vw;
    width:10vw;
}

select:hover {
    cursor: pointer;
    background-color: #1f1f1f;
    border-color:white;
    font-weight:bold;
    color:#fff;
}
</style>