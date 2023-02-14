<template>
    <main>
        <div class = "login">
            <form @submit.prevent = "loginSubmit()">
                <h3>Login</h3>

                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form" v-model="username" placeholder="Enter username">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form" v-model="password" placeholder="Enter password">
                </div>

                <button class="btn btn-primary btn-block" v-on:click = "loginSubmit">Submit</button>
            </form>
        </div>
    </main>
</template>

<script>
    export default {
        data () {
            return {
                username: '',
                password: ''
            }
        },
        methods : {
            loginSubmit() {
                console.log(this.username, this.password);

                if (result.status == 200) {
                    localStorage.setItem("user-info", JSON.stringify(result.data))
                    this.$router.push({name:'Home'})
                }
            }
        },
        mounted() {
            let user = localStorage.getItem('user-info');
            if(user) {
                this.$router.push({name: 'Home'})
            }
        }
    }
</script>

<style>
.login {
    border: solid black;
    text-align: center;
}


</style>