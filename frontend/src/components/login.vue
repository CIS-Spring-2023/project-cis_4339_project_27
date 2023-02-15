<template>
    <main>

        <div class="login">
            <form class="form-thing" @submit.prevent="loginSubmit">
                <h1 class="text-2xl font-bold">Login Page</h1>
                <div class="form-input">
                    <input type="text" name="username" v-model="input.username" placeholder="Username" />
                </div>
                <div class="form-input">
                    <input type="password" name="password" v-model="input.password" placeholder="Password" />
                </div>
                <div class="form-input">
                    <button type="button" v-on:click="loginSubmit()">Login</button>
                </div>
            </form>
        </div>

    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useVuelidate({ $autoDirty: true }) }
    },
    data() {
        return {
            users: [
                {
                    username: 'admin',
                    password: 'pass',
                    role: 'editor'
                },
                {
                    username: 'local',
                    pass: '1234',
                    role: ''
                }
            ],
            input: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        loginSubmit() {
            if (this.input.username == 'admin' && this.input.password == 'pass') {
                sessionStorage.setItem('login', JSON.stringify(this.users[0]));
                this.$router.push({ name: 'Home' });
            } else {
                console.log('Invalid username/password')
            }
        }
    },
    mounted() {
        let user = sessionStorage.getItem('login');
        if (user) {
            this.$router.push({ name: 'Home' });
        }
    },
    validations() {
        return {
            input: {
                username: { required },
                password: { required }
            }
        }
    }
}
</script>

<style>
.login {
    text-align: center;
    padding-top: 50px;
}

.form-input {
    padding: 20px;
    border: none;
}

.form-input button {
    border: solid black;
}
</style>