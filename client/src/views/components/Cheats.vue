<template>
    <div class="animated fadeIn">
        <b-card no-body class="card-default">
            <div slot="header">
                <i class="fa fa-picture-o"></i> Cheaters
            </div>
            <b-card-body>
                <b-row class="text-center">
                    <b-col cols="6" sm="4" md="3" v-for="cheat in cheats" :key="cheat._id">
                        <i class="icon-emotsmile icons font-4xl d-block mt-2"></i><router-link :to="{path: 'components/cheater'}" v-on:click.native="click">
                            {{ cheat }}
                        </router-link>
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
    import axios from 'axios'
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
                axios.get('/cheats/getcheaternames')
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
                axios.get('/cheats/showAllCheater', {
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
