<template lang="">
    <div>
        {{ this.datas }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            datas: [],
            config: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'x-access-token': sessionStorage.getItem('token'),
                },
                withCredentials: true,
            },
        }
    },
    methods: {
        async getKamar() {
            const response = await this.axios.get('http://localhost:3000/user/kamars', this.config);
            this.datas = response.data.data;
        },
    },
    mounted() {
        this.getKamar();
        console.log(sessionStorage.getItem('token'));
    },
}
</script>
<style lang="">
    
</style>