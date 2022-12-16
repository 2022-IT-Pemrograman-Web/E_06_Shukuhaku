<template lang="">
    <div class="container px-4 py-5" id="custom-cards">
        <h2 class="pb-2 border-bottom fw-bold">Facilities</h2>
    
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div class="col" v-if="private_onsen == 'Yes'">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg onsen">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold white-text">Private Onsen</h3>
              </div>
            </div>
          </div>
    
          <div class="col" v-if="balcony == 'Yes'">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg balcony">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-3 mb-4 display-6 lh-1 fw-bold white-text">Mountain View Balcony</h3>
              </div>
            </div>
          </div>

          <div class="col" v-if="tv == 'Yes'">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg tv">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold white-text">TV</h3>
              </div>
            </div>
          </div>

          <div class="col" v-if="ac == 'Yes'">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg ac">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold white-text">AC</h3>
              </div>
            </div>
          </div>

          <div class="col" v-if="living_room == 'Yes'">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg living-room">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold white-text">Living Room</h3>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg breakfast">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold white-text">Breakfast : {{ breakfast }}</h3>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg breakfast" :class=" bed.type=='King' ? 'king-size-bed' : 'queen-size-bed' ">
              <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold white-text">Bed : {{ bed.quantity }} {{ bed.type }} Size</h3>
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
            bathroom: 0,
            breakfast: '',
            tv : '',
            bed : {},
            ac : '',
            living_room : '',
            balcony : '',
            private_onsen : '',
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
            } catch(err){
                console.log(err);
                this.$router.push('/login');
            }
        },
    },
    async beforeMount() {
        await this.getKamar();
        console.log('hi', this.$route.params.type)
        while(this.datas.kamars.length != 1){
            for(let i = 0; i < this.datas.kamars.length; i++){
                if(this.datas.kamars[i].class != this.$route.params.type){
                    this.datas.kamars.splice(i, 1);
                }
            }
        }
        this.bed = this.datas.kamars[0].facility.bed;
        this.bathroom = this.datas.kamars[0].facility.bathroom;
        this.breakfast = this.datas.kamars[0].facility.breakfast;
        this.tv = this.datas.kamars[0].facility.tv;
        this.ac = this.datas.kamars[0].facility.ac;
        this.living_room = this.datas.kamars[0].facility.living_room;
        this.balcony = this.datas.kamars[0].facility.balcony;
        this.private_onsen = this.datas.kamars[0].facility.private_onsen;
    },
}
</script>
<style lang="css">
    .onsen {
        background-image : url("../assets/onsen.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .balcony {
        background-image: url("../assets/balcony.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .tv {
        background-image: url("../assets/tv.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .white-text {
        color: white;
        text-shadow: 5px 5px 10px #000000;
    }

    .ac {
        background-image: url("../assets/ac.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .living-room {
        background-image: url("../assets/tv.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .breakfast {
        background-image: url("../assets/breakfast.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .king-size-bed {
        background-image: url("../assets/king-size-bed.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .queen-size-bed {
        background-image: url("../assets/queen-size-bed.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>