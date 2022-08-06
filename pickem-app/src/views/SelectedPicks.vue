<template>
    <h1>
        Select Picks
    </h1>
    <div id="submitted-picks"
        v-for="(pick,index) in picks"
        :key = "index"
        class = "selected-picks-container">
        {{ pick }}
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
        let selectedpicks = this.$route.params.selectedpicks;
        this.picks = selectedpicks
    }
};
</script>
