<template>
  <div id="">
      <button type="button" name="button" @click="submit">Google</button>

  </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {

        }
    },
    methods: {
        submit(){
            alert("click")
            axios.get('/auth/google',{
                headers:{
                    Authorization:   'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.toString())
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
