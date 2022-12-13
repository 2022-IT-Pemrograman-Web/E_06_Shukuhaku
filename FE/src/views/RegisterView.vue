<template>
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
                        <input type="text" class="form-control" id="floatingInputName" placeholder="John Doe" v-model="this.datas.name">
                        <label for="floatingInput">Name</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="this.datas.password">
                        <label for="floatingPassword">Password</label>
                      </div>
                      <div class="d-grid">
                        <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" @click="register">
                            Register
                        </button>
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
                name: '',
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
        async register() {
            const response = await this.axios.post('http://localhost:3000/register', this.datas, this.config);
            console.log(response);
            if(response.status == 200){
                this.message = '';
                var creds = {
                        email: this.datas.email,
                        password: this.datas.password,
                    };
                console.log(creds);
                const res = await this.axios.post('http://localhost:3000/login', creds, this.config);
                console.log(res);
                var token = res.data.data.token;
                sessionStorage.setItem('token', token);
                console.log(sessionStorage.getItem('token'));
                this.$router.push('/home');
            }
            else{
                this.message = "Register failed! Check your input.";
            }
        },
    },
    mounted(){
        if(sessionStorage.getItem('token') != null){
            this.$router.push('/home');
        }
    }
}
</script>