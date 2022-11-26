<template>
    <div>
        <h2>Login</h2>
        <div class = "registration-container">
            <ul>
                <li>
                    <div class = "registration-label-input">
                        <label>Email</label>
                        <br>
                        <input
                            type="email"
                            name="email"
                            v-model="email"
                            placeholder="Email" />
                    </div>
                </li>
                <li>
                    <div class = "registration-label-input">
                        <label>Password</label>
                        <br>
                        <input
                            type="password"
                            name="password"
                            v-model="password"
                            placeholder="Password" />
                    </div>
                </li>
                
                <div v-if="error" class="error" v-html="error" />
                <div v-if="success && !error" class="success" v-html="success" />
                <br>
                <button
                    @click="login">Login</button>
            </ul>
        </div>
    </div>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
    name: "LoginUser",
    data() {
        return { 
            email:'',
            password:'',
            error: null,
            success: null
        }
    },
    methods: {        
        async login() {
            this.error = null;
            try {                
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push({
                    name: 'ShowPicks'
                })
            } catch(error) {
                this.error = error.response.data.error
            }

        }
    }
}
    


</script>

<style scoped>
.registration-container {
    /* width:33%; */
    text-align: center;
    /* align-items:center;
    display:flex; */
}
ul {
    display: inline-block;
    width:25%;
    margin:0px;
    padding:0px;
}

.registration-label-input {
    text-align:left;
}

label {
    font-size:12px;
}
li {
    padding-top:10px;
    list-style: none;
    display:block;
}

input {
    font-size:14px;
    width:100%;
    height:48px;
    padding:7px 8px;
    box-sizing: border-box;
    border: 1px solid #c5c5c5;
}
.error {
    padding-top:10px;
    color:red;
}
.success {
    padding-top:10px;
    color:green;
}

button {
    font-weight: bold;
    background-color: dodgerblue;
    border-radius: 5px;
    font-size: 1vw;
    border:none;
    color:#fff;
    height:48px;
    width:100%;
}

button:hover {
    cursor: pointer;
    background-color: #fff;
    font-weight:bold;
    color:#1f1f1f;
}


</style>