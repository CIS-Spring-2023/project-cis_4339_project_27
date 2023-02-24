<template>
    <main>

        <div class="login">
            <form class="form-thing" @submit.prevent="loginSubmit">
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
const apiURL = import.meta.env.VITE_ROOT_API
import axios from 'axios'

export default {
    setup() {
        return { v$: useVuelidate({ $autoDirty: true }) }
    },
    data() {
        return {
            userData: [
                {
                    username: 'admin',
                    password: 'admin',
                    role:'editor',
                    orgs: '1'
                },
                {
                    username: 'testuser',
                    password: 'testuser',
                    role: '',
                    orgs: '1'
                }
            ],
            username: '',
            password: ''
        }
    },
    methods: {
        async loginSubmit() {
            if(this.username === 'admin' && this.password === 'admin') {
                sessionStorage.setItem('user', JSON.stringify(this.userData[0]));
                this.$router.push({ name: 'Home'}).then(location.reload())
            } else if (this.username === 'testuser' && this.password === 'testuser') {
                sessionStorage.setItem('user', JSON.stringify(this.userData[1]));
                this.$router.push({ name: 'Home'}).then(location.reload())
            } else {
                alert('Invalid Login');
                this.username =''
                this.password = ''
            }
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
        }
    },
    mounted() {
        let user = sessionStorage.getItem('user');
        if (user) {
            this.$router.push({ name: 'Home' });
        }
    },
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