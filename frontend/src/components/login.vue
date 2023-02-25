<template>
    <main>

        <div class="row justify-content-center pt-3">
            <div class="col-md-4">
                <h1 class="text-center pb-3 font-weight-bold text-danger fs-3">Login Page</h1>
                <form @submit.prevent="loginSubmit">
                    <div class="form-group">
                        <label>Username</label>
                        <input class="form-control" type="text" name="username" v-model="username" placeholder="Username" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" v-model="password"
                            placeholder="Password" />
                    </div>
                    <div>
                        <button class="btn-grp" type="submit">Login</button>
                    </div>
                </form>
            </div>
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
            username: '',
            password: ''
        }
    },
    methods: {
        async loginSubmit() {
            const noMissingField = await this.v$.$validate();

            if (noMissingField) {
                axios.post(`${apiURL}/users`, { username: this.$data.username, password: this.$data.password })
                    .then((res) => {
                        if (res.data) {
                            sessionStorage.setItem('user', JSON.stringify(res.data))
                            this.$router.push({ name: 'Home' }).then(location.reload())
                            console.log(res)
                        }
                    }).catch((err) => {
                        if (err.response.status === 400) {
                            alert(err.response.data.error);
                            this.username = '';
                            this.password = '';
                        }
                    })
            }
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
            username: { required },
            password: { required }
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