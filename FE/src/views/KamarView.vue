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
        }
    },
    methods: {
        async getKamar() {
            const response = await this.axios.get('http://localhost:3000/user/kamars');
            this.datas = response.data;
        },
    },
    mounted() {
        this.getKamar();
    },
}
</script>
<style lang="">
    
</style>