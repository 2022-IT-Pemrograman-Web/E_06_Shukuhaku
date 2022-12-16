<template lang="">
    <div class="container">
        <form @submit.prevent="storeNewKamar()">
            <div class="row g-3">
                <div class="col-md-12">
                    <label for="kamar_id" class="form-label">Nomor Kamar</label>
                    <input type="text" class="form-control" id="kamar_id" placeholder="Nomor Kamar" min="1" v-model="kamar_id" required>
                    <div class="invalid-feedback">
                      Please enter valid number of day
                    </div>
                </div>
    
                <div class="col-md-12">
                    <label for="kamar_class" class="form-label">Jenis Kamar</label>
                    <select class="form-select" id="kamar_class" required v-model="kamar">
                        <option v-for="j in datas" :value="j">
                        {{j.class}} 
                        </option>
                    </select>
    
                </div>
            </div>
            <hr>
            <button class="w-100 btn btn-primary btn-lg" type="submit">Add New Kamar</button>
        </form>

        
    </div>
</template>
<script>
export default {
    data() {
        return {
            datas: [],
            kamar_id : '',
            kamar: Object,
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
                this.datas = response.data.data.kamars;
                console.log(response)
            } catch(err){
                console.log(err);
                this.$router.push('/login');
            }
            
        },
        async storeNewKamar(){
            try {
                console.log(this.kamar)
                const response = await this.axios.post('http://localhost:3000/admin/kamars', {
                    id: this.kamar_id,
                    class: this.kamar.class,
                    price: this.kamar.price,
                    facility: JSON.stringify(this.kamar.facility),
                }, this.config);
            }
            catch(err) {
                console.log(err);
            }
        }
    },
    beforeMount() {
        this.getKamar();
        //console.log(localStorage.getItem('token'));
    },
}
</script>
<style lang="">
    
</style>