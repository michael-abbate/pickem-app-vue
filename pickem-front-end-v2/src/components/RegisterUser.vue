<template>
    <div>
        <h2>Register</h2>
        <input
            type="text"
            name="firstname"
            v-model="firstname"
            placeholder="First Name" />
        <br>
        <input
            type="text"
            name="lastname"
            v-model="lastname"
            placeholder="Last Name" />
        <br>
        <input
            type="text"
            name="username"
            v-model="username"
            placeholder="Username" />
        <br>
        <input
            type="email"
            name="email"
            v-model="email"
            placeholder="Email" />
        <br>
        <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Password" />
        <br>
        <button
            @click="register">Register</button>
    </div>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService';

export default {
    name: "RegisterUser",
    data() {
        return { 
            firstname:'',  
            lastname:'',
            username:'',
            email:'',
            password:''         
        }
    },
    methods: {        
        async register() {
            await AuthenticationService.register({
                firstname: this.firstname,
                lastname: this.lastname, 
                username: this.username,
                email: this.email, 
                password: this.password
            });      
        }
    }
}
    


</script>

<style scoped>

</style>