import axios from 'axios'

export default {
    gradePicks (picks) {
        return axios.post('/api/group/picks/grade', picks)
    }
}