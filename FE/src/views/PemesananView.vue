<template lang="">
    <div class="container" v-if="loggedUser == 'admin'">
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="../assets/image (3).png" alt="" width="126" height="72">
        <h2>Pemesanan Aktif</h2>
        <!-- <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p> -->
      </div>
      <div class="row g-5">
        <div class="col-md-5 col-lg-6 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Check In</span>
          </h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">User</th>
                <th scope="col">Kamar ID</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, id) in pemesanan_checked_in" :key="id">
                <th scope="row" v-if="p.checked_in == null && p.checked_out == null">{{ id+1 }}</th>
                <td v-if="p.checked_in == null && p.checked_out == null">{{ p.user_id }}</td>
                <td v-if="p.checked_in == null && p.checked_out == null">{{ p.kamar_id }}</td>
                <td v-if="p.checked_in == null && p.checked_out == null">{{ p.start_date }}</td>
                <td v-if="p.checked_in == null && p.checked_out == null">{{ p.end_date }}</td>
                <td v-if="p.checked_in == null && p.checked_out == null">
                  <button class="btn btn-danger btn-lg box-shadow" type="button" v-if="p.checked_in == null && p.checked_out == null" v-on:click="checkedIn(p.id)">Check In</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-md-5 col-lg-6 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Check Out</span>
          </h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">User</th>
                <th scope="col">Kamar ID</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, id) in pemesanan_checked_out" :key="id">
                <th scope="row" v-if="p.checked_in != null && p.checked_out == null">{{ id+1 }}</th>
                <td v-if="p.checked_in != null && p.checked_out == null">{{ p.user_id }}</td>
                <td v-if="p.checked_in != null && p.checked_out == null">{{ p.kamar_id }}</td>
                <td v-if="p.checked_in != null && p.checked_out == null">{{ p.start_date }}</td>
                <td v-if="p.checked_in != null && p.checked_out == null">{{ p.end_date }}</td>
                <td v-if="p.checked_in != null && p.checked_out == null">
                  <button class="btn btn-danger btn-lg box-shadow" type="button" v-if="p.checked_in != null && p.checked_out == null" v-on:click="checkedOut(p.id)">Check Out</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="container" v-if="loggedUser == 'user'">
          <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4" src="../assets/image (3).png" alt="" width="126" height="72">
            <h2>Form Pembayaran</h2>
            <!-- <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p> -->
          </div>
          
          <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="msg_gagal">
            Room is Full
            <button type="button" class="btn-close" v-on:click="msg_gagal = false" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <div class="alert alert-success alert-dismissible fade show" role="alert" v-if="code_redeemed">
            Code is Successfully Redeemed
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-primary">Redeem Your Code</span>
                <!-- <span class="badge bg-primary rounded-pill">3</span> -->
              </h4>
              
      
              <div class="card p-2">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Promo code" v-model="code">
                  <button type="submit" class="btn btn-secondary" v-on:click="getDiscount(code)">Redeem</button>
                </div>
              </div>
            </div>


            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Pemesanan</h4>
              <form class="needs-validation" @submit.prevent="storePemesanan()">
                <div class="row g-3">

                  <div class="col-12">
                    <label for="kamar_class" class="form-label">Jenis Kamar</label>
                    <select class="form-select" id="kamar_class" required v-model="kamar">
                      <option v-for="j in jenis_kamar" :value="j">
                        {{j.class}} 
                      </option>
                    </select>
                  </div>

                  <div class="col-md-6">
                    <label for="start_date" class="form-label">Start Date</label>
                    <input type="date" class="form-control" id="start_date" placeholder="Choose Date" :min="date" v-model="start_date" required>
                    <div class="invalid-feedback">
                      Please enter valid date
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="total_day" class="form-label">Total Day</label>
                    <input type="number" class="form-control" id="total_day" placeholder="Total Day" min="1" v-model="total_day" required>
                    <div class="invalid-feedback">
                      Please enter valid number of day
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="total_price" class="form-label">Total Price</label>
                    <input type="number" class="form-control" id="total_price" :value="total_price" :placeholder="total_price" disabled>
                  </div>
      
                  
                </div>
      
                <hr class="my-4">
                <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
              </form>

              <br>
              <br>
              <br>
              <br>
              <br>
              <br>
            </div>
          </div>
        </div>
</template>
<script>
export default {
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            jenis_kamar: [],
            config: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'x-access-token': localStorage.getItem('token'),
                },
                withCredentials: true,
            },
            kamar: {
                class: '',
                price: '',
            },
            total_day : 0,
            voucher : [],
            code : '',
            total_discount : 1.0,
            start_date : '',
            msg_gagal : false,
            code_redeemed : false,
            loggedUser : JSON.parse(localStorage.getItem('user')).role,
            pemesanan_checked_in : [],
            pemesanan_checked_out : [],
        }
    },
    computed: {
        total_price() {
            return this.kamar.price * this.total_day * this.total_discount;
        },
    },
    emits : {
        updateLogin : null,
        destroyUser : null,
    },
    methods: {
      async getKamar() {
            try{
                const response = await this.axios.get('http://localhost:3000/user/kamars/class', this.config);
                this.datas = response.data.data;
                for (let i of this.datas.kamars) {
                    this.jenis_kamar.push({
                      class: i.class,
                      price: i.price,
                    })
                }
            } catch(err){
                console.log(err);
                this.$router.push('/login');
            }
      },
      async getCode() {
          try{
              const response = await this.axios.get('http://localhost:3000/user/voucher', this.config);
              this.voucher = response.data.data.voucher;
              console.log(this.voucher);
          } catch(err){
              console.log(err);
              this.$router.push('/login');
          }
      },
      getDiscount(code){
        for (let i of this.voucher) {
          if (i.code == code) {
            this.total_discount = 1 - (i.discount/100);
            this.code_redeemed = true;
            break;
          }
          else{
            this.total_discount = 1.0;
            this.code_redeemed = false;
          }
        }
      },
      async storePemesanan() {
        try{
          console.log(new Date(this.start_date));
          const response = await this.axios.post('http://localhost:3000/user/pemesanans', {
              kamar_class: this.kamar.class,
              start_date: new Date(this.start_date),
              total_day: this.total_day,
              total_price: this.total_price,
          }, this.config);
          this.$router.push('/home');
        }
        catch(err){
          // this.$router.push('/pemesanan');
          this.msg_gagal = true;
        }
        // console.log(response);
        // if(response.response.status == 200){
        //     this.$router.push('/home');
        // }
        // else{
        //     this.$router.push('/user/pemesanan');
        // }
      },
      async getActivePemesanan(){
        try{
          const response = await this.axios.get('http://localhost:3000/admin/pemesanans/active', this.config);
          this.pemesanan_checked_in = response.data.data.pemesanans.filter((x) => x.checked_in == null && x.checked_out == null);
          this.pemesanan_checked_out = response.data.data.pemesanans.filter((x) => x.checked_in != null && x.checked_out == null);
          // console.log(this.pemesanan);
        }
        catch(err){
          console.log(err);
        }
      },
      async checkedIn(id){
        try{
          const response = await this.axios.post('http://localhost:3000/admin/pemesanans/checkin', {
            id: id,
          }, this.config);
          this.getActivePemesanan();
        }
        catch(err){
          console.log(err)
        }
      },
      async checkedOut(id){
        try{
          const response = await this.axios.post('http://localhost:3000/admin/pemesanans/checkout', {
            id: id,
          }, this.config);
          this.getActivePemesanan();
        }
        catch(err){
          console.log(err)
        }
      },
    },
    beforeMount() {
      if(this.loggedUser == 'user'){
        this.getKamar();
        this.getCode();
        console.log(this.jenis_kamar)
        console.log(this.loggedUser)
      }
      else{
        this.getActivePemesanan();
      }
    },
    mounted() {
      console.log(this.date);
      
    }
}
</script>
<style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
    </style>