<template>
    <div>
        <h1>Register</h1>
        
        <input 
            type="email"
            name="email"
            v-model="email"
            placeholder="email@mail.com"
        />
        <br>
        <input 
            type="password"
            name="password"
            v-model="password"
            placeholder="Password"
        />
        <br><br>
        <button @click="register">Register</button>
    </div>
</template>

<script>
    import AuthenticationService from '@/services/AuthenticationService'

    export default {
    data () {
        return {
            email:'',
            password:''
        }
    },
    /* watch: {
        email (value){
            console.log('email has changed ', value) // we can see the log every change while user type the character 
        }
    }, */
    methods: {
        async register() {
            /* const response = */ await AuthenticationService.register({
                email: this.email,
                password: this.password
            })
            // console.log('register button clicked', this.email, this.password)
            /* console.log(response.data); */
        }
    }/* ,
    mounted () {
        setTimeout(() => {
            this.email = 'hello world' // we can make delay changed
        }, 2000)
    } */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
