<template>
    <div class = "selected-picks-container">
        <ul>
            <li v-for="(pick,index) in picks"
                :key = "index"
                :id="pick+'submitted-picks'">
                {{ pick }}
            </li>
        </ul>
    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// import router from '../router'

export default {
    name: 'SelectedPicks',
    data() {
       return {
           picks:null
       } 
    },
    mounted() {
        this.picks = this.$route.params.picks;
    }
};
</script>
