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
                    <b-card>
                        <div slot="header">
                            {{ cheat.title }}
                            <b-badge variant="success" class="float-right">{{ cheat.name }}</b-badge>
                            <a href="#"><b-badge variant="error" class="float-right" @click="deleteCheater(cheat._id, $event)"><i class="fa fa-trash-o"></i></b-badge></a>
                            <a href="#"><b-badge variant="warning" class="float-right" @click="editCheater(cheat, $event)"><i class="fa fa-edit"></i></b-badge></a>
                        </div>
                        <code>{{ cheat.code }}</code>
                        <span>{{ cheat.description }}</span>
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
    export default {
        name: 'search-results',
        data () {
            return {
                message: '',
                cheaters: '',
                showCheater: false,
                deleteMessageShow: false,
                deletedMessage: 'Success deleting cheater!..',
                showMessage: 'Success Updating Cheater'
            }
        },
        methods: {
            submitSearch (event) {
                event.preventDefault()
                console.log(event.target.value, 'target')
                this.message = event.target.value
                this.getAll()
            },
            getAll () {
                this.axios.get('/cheats/searchCheater', {
                    params: {
                        name: this.message.trim()
                    }
                })
                .then((response) => {
                    // this.bus.$emit('clicked-nav-item', response.data)
                    this.showCheater = true
                    this.cheaters = response.data
                })
                .catch((error) => {
                    console.log(error, 'err')
                })
            },
            deleteCheater (id, event) {
                event.preventDefault()
                let options = {
                    html: false,
                    loader: true
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
                this.axios.post('/cheats/deleteCheater', {
                    id: id
                })
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
                console.log(cheat._id, 'id of edited')
            },
            submitEdit () {
                this.axios.post('cheats/editvueform', {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    name: this.name,
                    id: this.id
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    .search {
        border-color: #e4e5e6;
        background-color: #ffffff;
    }
</style>
