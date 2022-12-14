<template lang="">
    <div class="container">
        <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="feature col" v-if="private_onsen == 'Yes'">
              <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
              </div>
              <h3 class="fs-2">Featured titles</h3>
              <p></p>
              <a href="#" class="icon-link d-inline-flex align-items-center">
                Call to action
                <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
              </a>
            </div>
            <div class="feature col">
              <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <svg class="bi" width="1em" height="1em"><use xlink:href="#people-circle"></use></svg>
              </div>
              <h3 class="fs-2">Featured title</h3>
              <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
              <a href="#" class="icon-link d-inline-flex align-items-center">
                Call to action
                <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
              </a>
            </div>
            <div class="feature col">
              <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <svg class="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
              </div>
              <h3 class="fs-2">Featured title</h3>
              <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
              <a href="#" class="icon-link d-inline-flex align-items-center">
                Call to action
                <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"></use></svg>
              </a>
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
    async mounted() {
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
        console.log(this.datas.kamars[0].facility);
    },
}
</script>
<style lang="">
    
</style>