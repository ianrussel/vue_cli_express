<template>
    <div class="wrapper">
        <div class="animated fadeIn">
            <b-row>
                <b-col cols="12">
                    <b-card header="Cheaters">
                        <p v-for="cheat in cheats" :key="cheat._id"><router-link :to="{path: 'components/cheater'}" v-on:click.native="click">{{ cheat }}</router-link></p>
                    </b-card>
                </b-col>
            </b-row>
            <!-- <div class="row text-center text-lg-left">
                <div class="col-lg-3 col-md-4 col-xs-6" v-for="cheat in cheats" :key="cheat._id">
                    <a href="#" class="d-block mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="" alt="">{{cheat}}
                    </a>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cheats',
        data () {
            return {
                cheats: '',
                cheater: ''
            }
        },
        mounted () {
            this.getCheaterNames()
        },
        methods: {
            getCheaterNames () {
                this.axios.get('/cheats/getcheaternames')
                .then((response) => {
                    this.cheats = response.data
                })
                .catch((error) => {
                    console.log(error, 'err')
                })
            },
            click (e) {
                e.preventDefault()
                this.cheater = e.target.innerText
                this.getAll()
            },
            getAll () {
                this.axios.get('/cheats/showAllCheater', {
                    params: {
                        name: this.cheater.trim()
                    }
                })
                .then((response) => {
                    this.bus.$emit('clicked-nav-item', response.data)
                })
                .catch((error) => {
                    console.log(error, 'err')
                })
            }
        }
    }
</script>
<style media="screen">
    div{
        display: block;
    }
    p {
        -webkit-margin-before: 1em;
        -webkit-margin-after: 1em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
    }
    /*body {
        padding-top: 54px;
    }

    @media (min-width: 992px) {
        body {
            padding-top: 56px;
        }
    }*/
</style>
