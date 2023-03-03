import { defineStore } from 'pinia';

export const userLoggedIn = defineStore({
    id:"loggedInUser",

    state: () => {
        return {
            name: '',
            role: '',
            isLoggedIn: false,
        }
    },


    actions: {
        async login(username, password) {
            try{
                const response = await apiLogin(username, password);

                this.$patch({
                    isLoggedIn: response.isAllowed,
                    name: response.name,
                    role: response.role
                })
                this.$router.push({ name: 'Home'})
            } catch (error){
                console.log(error);
            }
        },
        logout () {
            if(window.confirm('Do you want to logout?')) {
                this.$patch({
                    name:'',
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

function apiLogin(u, p) {
    if(u === 'admin' && p === 'admin') return Promise.resolve({isAllowed: true, name: 'admin', role:'editor' })
    if(u === 'testuser' && p === 'testuser') return Promise.resolve({isAllowed: true, name: 'testuser', role:''})
    return Promise.reject(new error('Invalid credentials'))
}
