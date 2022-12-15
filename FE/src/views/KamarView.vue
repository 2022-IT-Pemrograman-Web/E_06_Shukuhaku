<template lang="">
<link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">
<div class="container py-4">
    <div class="p-4 p-md-5 mb-4 rounded text-bg-dark">
    <div class="col-md-6 px-0">
      <h1 class="display-4 fst-italic">Tipe Kamar</h1>
      <p class="lead my-3">Choose based on your liking</p>
      <!-- <p class="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p> -->
    </div>
  </div>

  <div class="row mb-2">
    <div class="col-md-6" v-for="(data, id) in datas.kamars" :key="id">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary"></strong>
          <h3 class="mb-0 fw-bold">{{ data.class }}</h3>
          <p class="card-text mb-auto"></p>
          <a :href="'/kamar/' + data.class" class="stretched-link">Check Facilites</a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <!-- <svg class="bd-placeholder-img" width="200" height="250" xmlns="https://picsum.photos/200/300" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
            <img class="bd-placeholder-img" :src="'https://picsum.photos/id/' + random() + '/200/255'" alt="">
        </div>
      </div>
    </div>
  </div>
  <div>
      {{ this.datas }}
      <div class="card">
          <div class="card-header">
              
          </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
    props: ['loggedIn', 'loggedUser'],
    emits: ['updateLogin', 'destroyUser'],
    data() {
        return {
            datas: [],
            config: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'x-access-token': localStorage.getItem('token'),
                },
                withCredentials: true,
            },
        }
    },
    methods: {
        async getKamar() {
            try{
                const response = await this.axios.get('http://localhost:3000/user/kamars/class', this.config);
                this.datas = response.data.data;
                console.log(response)
            } catch(err){
                console.log(err);
                this.$router.push('/login');
            }
            
        },
        random() {
            return Math.floor(Math.random() * 1000) + 1;
        },
    },
    mounted() {
        this.getKamar();
        //console.log(localStorage.getItem('token'));
    },
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