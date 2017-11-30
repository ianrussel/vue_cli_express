<template>
    <div id="">
        <div class="form-group">
            <input type="text" class="form-control search" placeholder="Search for cheaters" @keyup="submit($event)">
        </div>
        <div class="animated fadeIn">
            <!-- <span v-if="deleteMessageShow">{{ deletedMessage }}</span>
            <span v-if="showSuccessMessage = false">{{ showMessage }}</span> -->
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
                showCheater: false
            }
        },
        methods: {
            submit (event) {
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
                console.log('delete is click')
            },
            editCheater (cheat, event) {
                console.log('edit cheater')
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
