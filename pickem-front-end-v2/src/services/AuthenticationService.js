// import Api from '@/services/Api'
import axios from 'axios'
export default {
    register (credentials) {
        return axios.post('/api/register', credentials)
    }
}

// AuthenticationService.regiser({
//     email: 'testing@gmail.com',
//     password: '123456'
// });