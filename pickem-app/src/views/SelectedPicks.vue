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
    font-size:  1.1vw;
    border-collapse:separate; 
    border-spacing:.5em!important;
}
</style>