<template lang="">
    <div>
        <div class="container">
            <div class="row">
              <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card border-0 shadow rounded-3 my-5">
                  <div class="card-body p-4 p-sm-5">
                    <h5 class="card-title text-center mb-5 fw-light fs-5">Log In</h5>
                    <form @submit.prevent="">
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="this.datas.email">
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="this.datas.password">
                        <label for="floatingPassword">Password</label>
                      </div>
        
                      <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck">
                        <label class="form-check-label" for="rememberPasswordCheck">
                          Remember password
                        </label>
                      </div>
                      <div class="d-grid">
                        <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" v-on:click="login()">Sign
                          in</button>
                      </div>
                      <hr class="my-4">
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            datas : {
                email: '',
                password: '',
            },
            config: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredentials: true,
            },
        }
    },
    methods: {
        async login() {
            const response = await this.axios.post('http://localhost:3000/login', this.datas, this.config);
            console.log(response);
            var token = response.data.data.token;
            var user = response.data.data.user;
            sessionStorage.setItem('user', user);
            sessionStorage.setItem('token', token);
            this.$emit('updateLogin', user);
            console.log(sessionStorage.getItem('token'));
            this.$router.push('/home');
        },
    },
    mounted() {
        if (sessionStorage.getItem('token') != null) {
            this.$router.push('/home');
        }
    },
}
</script>
<style lang="">
    
</style>