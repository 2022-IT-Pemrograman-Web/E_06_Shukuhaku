<template lang="">
    <div class="container">
      <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <a href="/home" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <img src="../assets/image (3).png" style="width: 84px; height: 48px" alt="">
          </a>
    
          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><router-link to="/home" class="nav-link px-2 link-dark big-text">Home</router-link></li>
            <li><router-link to="/kamar" class="nav-link px-2 link-dark big-text">Kamar</router-link></li>
            <li><router-link to="/pemesanan" class="nav-link px-2 link-dark big-text">Pemesanan</router-link></li>
            <li><a href="https://its.id/m/shukuhakuaboutus" class="nav-link px-2 link-dark big-text">About</a></li>
          </ul>
    
          <div class="col-md-3 text-end">
            <button type="button" class="btn btn-outline-primary me-2" v-if="!loggedIn">
                <router-link class="no-decor" to="/login">
                    Login
                </router-link>
            </button>
            <button type="button" class="btn btn-primary" v-show="!loggedIn">
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
      }
    },
    props:[
      'loggedIn'
    ],
    methods:{
      logout(){
        sessionStorage.clear();
        this.$emit('destroyUser');
        this.$router.push('/login');
      },
    },
}
</script>
<style lang="css">
  .big-text {
      font-size: 1.5em;
      font-family: 'SF Pro Display';
      font-weight: 200;
  }
  .no-decor{
    text-decoration: none;
  }
  .white{
    color: white;
  }
</style>