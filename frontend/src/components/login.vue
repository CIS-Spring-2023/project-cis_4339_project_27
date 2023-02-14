<template>
    <main>

        <form @submit.prevent="loginSubmit">
            <div id="login">
                <h1>Login</h1>
                <input type="text" name="username" v-model="input.username" placeholder="Username" />
                <input type="password" name="password" v-model="input.password" placeholder="Password" />
                <button type="button" v-on:click="loginSubmit()">Login</button>
            </div>
        </form>

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
            input: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async loginSubmit() {
            const isFormCorrect = await this.v$.$validate();

            if (isFormCorrect) {
                console.log(this.input.username, this.input.password);
            }

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
    display: grid;
    place-items: center;
    border: solid black;
    margin: auto;
}
</style>