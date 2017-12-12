<template>
    <div id="">
        <div class="form-group">
            <input type="text" class="form-control search" placeholder="Search for cheaters" @keyup="submitSearch($event)">
        </div>
        <div class="animated fadeIn">
            <span v-if="deleteMessageShow">{{ deletedMessage }}</span>
            <span v-if="showSuccessMessage = false">{{ showMessage }}</span>
            <b-row v-if="showCheater">
                <b-col sm="6" md="4" v-for="cheat of cheaters" :key="cheat._id">
                    <b-card v-tooltip="{content: cheat.description, delay: 2000}">
                        <div slot="header">
                            {{ cheat.title | capitalize }}
                            <b-badge variant="success" class="float-right">{{ cheat.name }}</b-badge>
                            <a href="#"><b-badge variant="error" class="float-right" @click="deleteCheat(cheat._id, $event)"><i class="fa fa-trash-o"></i></b-badge></a>
                            <a href="#"><b-badge variant="warning" class="float-right" @click="editCheater(cheat, $event)"><i class="fa fa-edit"></i></b-badge></a>
                        </div>
                        <pre>{{ cheat.code }}</pre>
                        <div slot="footer">
                        	{{ cheat.description | capitalize }}
                    	</div>
                    </b-card>
                </b-col>
            </b-row>
            <div class="animated fadeIn" v-if="editForm">
                <b-row>
                    <b-col md="12">
                        <b-card>
                            <div slot="header">
                                <strong>Edit</strong> Cheater &nbsp; &nbsp;
                            </div>
                            <form action="#" id ="addvueform" class="form-horizontal" @submit.prevent="submitEdit">
                                <b-form-fieldset
                                    description="Let us know the title."
                                    :label-cols="1"
                                    :horizontal="true">
                                    <b-form-input type="text" v-model="title" :required="true"></b-form-input>
                                </b-form-fieldset>
                                <b-form-fieldset
                                    description="Write the description for the cheater"
                                    :label-cols="1"
                                    :horizontal="true">
                                    <textarea v-model="description" name="description" rows="8" cols="80" class="form-control" placeholder="Write your description here.." :required="true"></textarea>
                                </b-form-fieldset>
                                <b-form-fieldset
                                    description="Write the code"
                                    :label-cols="1"
                                    :horizontal="true">
                                    <textarea v-model="code" name="code" rows="8" cols="80" class="form-control" placeholder="Write your code here.." :required="true"></textarea>
                                </b-form-fieldset>
                                <b-form-fieldset
                                    description="Cheater Name"
                                    :label-cols="1"
                                    :horizontal="true">
                                    <b-form-input type="text" :disabled="true" name="name" v-model="name"></b-form-input>
                                </b-form-fieldset>
                                <div slot="footer">
                                    <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
                                    <b-button type="reset" size="sm" variant="danger" @click="reset"><i class="fa fa-ban"></i> Reset</b-button>
                                    <b-button size="sm" variant="danger" @click="cancel"><i class="fa fa-ban"></i> Cancel</b-button>
                                </div>
                            </form>
                        </b-card>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>
<script>
    import { getAll, deleteCheater } from '../cheat.js'
    import { getAccessToken, isLoggedIn, userRole, login } from '../../utils/auth.js'
    import axios from 'axios'
    export default {
        name: 'search-results',
        data () {
            return {
                message: '',
                cheaters: '',
                showCheater: false,
                deleteMessageShow: false,
                deletedMessage: 'Success deleting cheater!..',
                showMessage: 'Success Updating Cheater',
                editForm: false,
                role: ''
            }
        },
        mounted () {
            this.getAccessTokens()
            if (isLoggedIn()) {
                this.getUserRole()
            }
        },
        methods: {
            getAccessTokens () {
                getAccessToken()
            },
            submitSearch (event) {
                event.preventDefault()
                this.message = event.target.value
                this.editForm = false
                this.get()
            },
            get () {
                this.getAll('/cheats/searchCheater', {
                    params: {
                       name: this.message.trim()
                   }
               }, this.showCheater, this.cheaters)
            },
            deleteCheat (id, event) {
                if (!isLoggedIn()) {
                   this.handleLogin()
                }
                if (isLoggedIn() && this.role !== 'admin') {
                    alert('oh holy cow, you have not enough admin rights!')
                    return
                }
                event.preventDefault()
                let options = {
                    html: false,
                    loader: true
                }
                let message = 'Please confirm to continue'
                const url = '/cheats/deleteCheater'
                const data = {id: id}
                const headers = {headers: {Authorization: `Bearer ${getAccessToken()}`}}
                this.deleteCheater(id, message, options, this.deleteMessageShow, this.cheaters, url, data, headers)
            },
            editCheater (cheat, event) {
                event.preventDefault()
                this.editForm = true
                this.title = cheat.title
                this.description = cheat.description
                this.code = cheat.code
                this.name = cheat.name
                this.id = cheat._id
            },
            submitEdit () {
                if (!isLoggedIn()) {
                   this.handleLogin()
                }
                if (isLoggedIn() && this.role !== 'admin') {
                    alert('oh holy cow, you have not enough admin rights!')
                    return
                }
                axios.post('cheats/editvueform', {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    name: this.name,
                    id: this.id,
                    Authorization: `Bearer ${getAccessToken()}`
                })
                .then((response) => {
                    console.log(response.data, 'response')
                    this.editForm = false
                    this.deleteMessageShow = true
                    setTimeout(() => {
                        this.$router.push('/dashboard')
                    }, 1000)
                })
                .catch((error) => {
                    console.log(error, 'error')
                })
            },
            cancel () {
                this.$router.push('/dashboard')
            },
            getUserRole () {
                userRole().then((result) => {
                    this.role = result
                }).catch((err) => {
                    console.log(err.toString())
                })
            },
            handleLogin () {
                return login()
            },
            getAll,
            deleteCheater,
            getAccessToken
        }
    }
</script>
<style lang="scss" scoped>
    .search {
        border-color: #e4e5e6;
        background-color: #ffffff;
    }
    pre {
        color: #d7e0e4;
        background-color: #1b1b1c;
        padding: 10px;
    }
</style>
