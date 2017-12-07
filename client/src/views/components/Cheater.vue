<template>
    <div class="animated fadeIn">
        <span v-if="deleteMessageShow">{{ deletedMessage }}</span>
        <span v-if="showSuccessMessage = false">{{ showMessage }}</span>
        <b-row v-if="showCheater">
            <b-col sm="6" md="4" v-for="cheat of cheaters" :key="cheat._id">
                <b-card v-tooltip="{content: cheat.description, delay: 2000}">
                    <div slot="header">
                        {{ cheat.title | capitalize }}
                        <b-badge variant="success" class="float-right">{{ cheat.name }}</b-badge>
                        <a href="#"><b-badge variant="error" class="float-right" @click="deleteCheater(cheat._id, $event)"><i class="fa fa-trash-o"></i></b-badge></a>
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
                        <form action="#" id ="addvueform" class="form-horizontal" v-on:submit.prevent="submit">
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
</template>

<script>
    import { getAccessToken, isLoggedIn, userRole } from '../../utils/auth.js'
    export default {
        name: 'cheater',
        data () {
            return {
                cheater: '',
                cheaters: '',
                deleteMessageShow: false,
                deletedMessage: 'Success deleting cheater!..',
                showEditMessage: 'Success Updating Cheater',
                editForm: false,
                showCheater: true,
                title: '',
                description: '',
                code: '',
                name: '',
                id: '',
                role: ''
            }
        },
        mounted () {
            this.bus.$on('clicked-nav-item', (item) => {
                this.cheaters = item
            })
            if (isLoggedIn()) {
                this.getUserRole()
            }
        },
        methods: {
            deleteCheater (id, event) {
                event.preventDefault()
                let options = {
                    html: false,
                    loader: true
                }
                if (!isLoggedIn() || this.role !== 'admin') {
                    alert('oh holy cow, you have not enough admin rights!')
                    return
                }
                this.$dialog.confirm('Please confirm to continue', options)
                    .then((dialog) => {
                        console.log('it will be deleted')
                        this.delete(id)
                        this.deleteMessageShow = true
                        const pos = this.cheaters.map(elem => elem._id).indexOf(id)
                        this.cheaters.splice(pos, 1)
                        setTimeout(() => {
                            dialog.close()
                            this.deleteMessageShow = false
                        }, 500)
                    })
                    .catch(() => {
                        console.log('cancelled')
                    })
            },
            delete (id) {
                console.log(`Bearer ${getAccessToken()}`, 'get access token funcl')
                const headers = {
                    headers: {Authorization: `Bearer ${getAccessToken()}`}
                }
                const data = {
                    id: id
                }
                this.axios.post('/cheats/deleteCheater', data, headers)
                .then((response) => {
                    console.log(response, 'deleted baby')
                })
                .catch((error) => {
                    console.log(error.toString())
                })
            },
            editCheater (cheat, event) {
                event.preventDefault()
                this.editForm = true
                this.showCheater = false
                this.title = cheat.title
                this.description = cheat.description
                this.code = cheat.code
                this.name = cheat.name
                this.id = cheat._id
            },
            submit () {
                if (!isLoggedIn() || this.role !== 'admin') {
                    alert('oh holy cow, you have not enough admin rights!')
                    return
                }
                const headers = {
                    headers: {Authorization: `Bearer ${getAccessToken()}`}
                }
                const data = {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    name: this.name,
                    id: this.id
                }
                this.axios.post('/cheats/editvueform', data, headers)
                .then((response) => {
                    console.log(response.data, 'response')
                    this.editForm = false
                    this.showEditMessage = true
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
            // get the current user role
            getUserRole () {
                userRole().then((result) => {
                    this.role = result
                }).catch((err) => {
                    console.log(err.toString())
                })
            },
            getAccessToken
        }
    }
</script>
<style media="screen">
    pre {
        color: #d7e0e4;
        background-color: #1b1b1c;
        padding: 10px;
    }
</style>
