<template lang="">
    <NavbarVue 
        :loggedIn="loggedIn"
        :loggedUser="loggedUser"
        @destroyUser="destroyUser"
    />
    <RouterView 
        :loggedIn="loggedIn"
        :loggedUser="loggedUser"
        @updateLogin="updateLogin"
        @destroyUser="destroyUser"
    />
</template>
<script>
import NavbarVue from './components/Navbar.vue';
export default {
    data(){
        return{
            loggedIn: (sessionStorage.getItem('token') != null),
            loggedUser: null,
        }
    },
    methods:{
        updateLogin(user){
            this.loggedIn = (sessionStorage.getItem('token') != null);
            this.loggedUser = user;
        },
        destroyUser(){
            this.loggedUser = null;
            this.loggedIn = false;
        },
    },
    components: {
        NavbarVue
    }
}
</script>
<style lang="">
</style>