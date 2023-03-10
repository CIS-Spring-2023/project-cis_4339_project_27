import { defineStore } from 'pinia';
import axios from "axios";

export const userLoggedIn = defineStore({
    id:"loggedInUser",

    state: () => {
        return {
            username: '',
            role: '',
            isLoggedIn: false,
        }
    },


    actions: {
        async login(username, password) {
            try{
                const response = await axios.post('http://localhost:3000/users', { username: username, password: password });

                if(response) {
                    this.$patch({
                        isLoggedIn: true,
                        username: response.data.username,
                        role: response.data.role
                    })
                    this.$router.push({ name: 'Home'})
                }
                
            } catch(error) {
                alert(error)
            }
        },
        logout () {
            if(window.confirm('Do you want to logout?')) {
                this.$patch({
                    username:'',
                    role:'',
                    isLoggedIn: false  
                });
            }
        }
    },
    persist: {
        storage: sessionStorage
    }
});