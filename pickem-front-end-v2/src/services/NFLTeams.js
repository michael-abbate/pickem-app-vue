import Api from '@/services/Api'

export default {
    nflteams () {
        return Api.get('/api/nflteams')
    }
}

// go to https://www.youtube.com/watch?v=Fa4cRMaTDUI&ab_channel=freeCodeCamp.org 
// min 40:31 to see how to submit post request... will use this later when actually submitting picks