<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col md="12">
                <b-card>
                    <div slot="header">
                        <strong>Add New </strong> Cheater &nbsp; &nbsp;
                        <span v-if="success" class="success"><strong>{{ successMessage }}</strong></span>
                    </div>
                    <form action="#" id ="addvueform" class="form-horizontal" v-on:submit.prevent=" submitForm">
                    <b-form-fieldset
                        description="Let us know the title."
                        label="Title"
                        :label-cols="1"
                        :horizontal="true">
                        <b-form-input type="text" v-model="title" :required="true"></b-form-input>
                    </b-form-fieldset>
                    <b-form-fieldset
                        description="Write the description for the cheater"
                        label="Description"
                        :label-cols="1"
                        :horizontal="true">
                        <textarea v-model="description" name="description" rows="8" cols="80" class="form-control" placeholder="Write your description here.." :required="true"></textarea>
                    </b-form-fieldset>
                    <b-form-fieldset
                        description="Write the code"
                        label="Write Code"
                        :label-cols="1"
                        :horizontal="true">
                        <textarea v-model="code" name="code" rows="8" cols="80" class="form-control" placeholder="Write your code here.." :required="true"></textarea>
                    </b-form-fieldset>
                    <b-form-fieldset
                        label="Select"
                        :label-cols="1"
                        :horizontal="true">
                        <select class="form-control" v-model="name">
                            <option v-for="(item,index) in cheats" v-bind:value="item" :key="item._id">
                                {{ item }}
                            </option>
                        </select>
                    </b-form-fieldset>
                    <b-form-fieldset
                        description="Add cheater name if does not appear in dropdown"
                        label="Cheater Name"
                        :label-cols="1"
                        :horizontal="true">
                        <b-form-input type="text" name="name" v-model="name" :required="true"></b-form-input>
                    </b-form-fieldset>
                    <!-- <b-form-fieldset
                        label="File input"
                        :label-cols="3"
                        :horizontal="true">
                        <b-form-file :plain="true"></b-form-file>
                    </b-form-fieldset> -->
                    <div slot="footer">
                        <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                        <b-button type="reset" size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> Reset</b-button>
                    </div>
                    </form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { getAccessToken, isLoggedIn, login, userRole } from '../../utils/auth.js'
    import { getCheaterNames } from '../cheat.js'
    import { getNames } from '../../_nav.js'
    import axios from 'axios'
    export default {
        name: 'forms',
        data () {
            return {
                title: '',
                description: '',
                code: '',
                name: '',
                success: '',
                cheats: '',
                submitUrl: '/cheats/addvueform'
            }
        },
        mounted () {
            getCheaterNames().then((response) => {
                this.cheats = response
            })
            if (isLoggedIn()) {
                this.getUserRole()
            }
        },
        methods: {
            submitForm () {
                if (!isLoggedIn()) {
                    this.handleLogin()
                } else if (isLoggedIn() && this.role !== 'admin') {
                    alert('oh holy cow, you have not enough admin rights!')
                    return false
                } else {
                    this.submit()
                }
            },
            submit () {
                axios.post('/cheats/addvueform', {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    name: this.name
                })
                .then((response) => {
                    console.log(response, 'from add vue')
                    this.title = ''
                    this.description = ''
                    this.code = ''
                    this.name = ''
                    this.successMessage = '...Success Adding Cheater!'
                    this.success = true
                    getNames()
                    setTimeout(() => {
                        this.success = false
                    }, 1000)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
            },
            reset () {
                this.title = ''
                this.description = ''
                this.code = ''
                this.name = ''
            },
            // getCheaterNames () {
            //     axios.get('/cheats/getcheaternames')
            //     .then((response) => {
            //         this.cheats = response.data
            //         console.log(this.cheats, 'these are cheater names')
            //     })
            //     .catch((error) => {
            //         console.log(error, 'err')
            //     })
            // },
            // get the current user role
            getUserRole () {
                userRole().then((result) => {
                    this.role = result
                    console.log()
                }).catch((err) => {
                    console.log(err.toString())
                })
            },
            handleLogin () {
                return login()
            },
            getAccessToken,
            getCheaterNames
        }
    }
</script>
<style media="screen">
    textarea {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
    }
    .success {
        text-align: center;
        color: green;
        font-style: oblique;
    }
</style>
