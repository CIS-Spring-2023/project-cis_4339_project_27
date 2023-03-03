<template>
    <main>

        <div class="login">
            <form class="form-thing" @submit.prevent="store.login(username, password)">
                <h1 class="text-2xl font-bold">Login Page</h1>
                <div class="form-input">
                    <input class="input-group" type="text" name="username" v-model="username" placeholder="Username" />
                </div>
                <div class="form-input">
                    <input class="input-group" type="password" name="password" v-model="password" placeholder="Password" />
                </div>
                <div>
                    <button class="btn-grp" type="submit">Login</button>
                </div>
            </form>
        </div>

    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { userLoggedIn } from '@/stores/userLoggedIn'
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios'

export default {

    setup() {
        const store = userLoggedIn()
        return {
            store
        }
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
            // axios.post(`${apiURL}/users`, { username: this.$data.username, password: this.$data.password })
            //     .then((res) => {
            //         if (res.data) {
            //             sessionStorage.setItem('user', JSON.stringify(res.data))
            //             this.$router.push({ name: 'Home' }).then(location.reload())
            //             console.log(res)
            //         }
            //     }) .catch ((err) => {
            //         if (err.response.status === 400) {
            //             alert(err.response.data.error);
            //             this.username = '';
            //             this.password = '';
            //         }
            //     })
    validations() {
        return {
            username: {required},
            password: {required}
        }
    }
}
</script>

<style>
.login {
    padding-top: 60px;
    text-align: center;
    justify-content: center;
}

.form-input {
    padding-bottom: 20px;
    padding-top: 10px;
    border: none;
    padding-left: 37.5%;
}

.input-group {
    width: 40%;
    height: 45%;
}

.btn-grp {
    background-color: #c8102e;
    color: white;
    width: 25%;
}
</style>