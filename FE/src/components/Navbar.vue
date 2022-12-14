<template lang="">
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
          </a>
    
          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><router-link to="/home" class="nav-link px-2 link-dark">Home</router-link></li>
            <li><router-link to="/kamar" class="nav-link px-2 link-dark">Kamar</router-link></li>
            <li><router-link to="/pemesanan" class="nav-link px-2 link-dark">Pemesanan</router-link></li>
            <li><a href="https://its.id/m/shukuhakuaboutus" class="nav-link px-2 link-dark">About</a></li>
          </ul>
    
          <div class="col-md-3 text-end">
            <button type="button" class="btn btn-outline-primary me-2">
                <router-link class="no-decor" to="/login">
                    Login
                </router-link>
            </button>
            <button type="button" class="btn btn-primary">
                <router-link class="no-decor white" to="/register">
                    Register
                </router-link>
            </button>
            <button v-show="loggedIn" type="button" class="btn btn-danger" @click="logout">
              Logout
            </button>
          </div>
        </header>
    </div>
</template>
<script>
export default {
    data(){
      return{
        loggedIn: (sessionStorage.getItem('token') != null),
      }
    },
    methods:{
      logout(){
        sessionStorage.clear();
        this.loggedIn = false;
        this.$router.push('/login');
        this.loggedIn = (sessionStorage.getItem('token') != null);
      },
      load(){
        this.loggedIn = (sessionStorage.getItem('token') != null);
      }
    },
    created(){
        this.load();
    }
}
</script>
<style scoped>
    .no-decor{
      text-decoration: none;
    }
    .white{
      color: white;
    }
</style>