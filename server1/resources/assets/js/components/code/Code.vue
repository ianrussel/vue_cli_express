<template>
    <div class="row">
        <h3 class="header text-center" id="header">{{ name }}</h3>
        <div class="col-md-6" v-for="cheater in cheaters" v-if="showCheater">
            <!-- BEGIN PORTLET-->
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="fa fa-code" aria-hidden="true"></i>
                        <span class="caption-subject font-dark bold uppercase">{{ cheater._id }}</span>
                    </div>
                    <div class="actions">
                        <button class="btn btn-circle btn-icon-only btn-default" @click="showEditForm(cheater)">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-circle btn-icon-only btn-default" @click="deleteCheaterCharot(cheater._id)">
                            <i class="icon-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="portlet-body">
                    <h3>{{ cheater.title }}</h3>
                    <pre>{{ cheater.code }}</pre>
                </div>
            </div>
            <!-- END PORTLET-->
            <!-- BEGIN PORTLET-->
            <div class="portlet light bordered">
                <div class="portlet-body">
                    <h3>Description</h3>
                    {{ cheater.description }}
                </div>
            </div>
            <!-- END PORTLET-->
        </div>
        <edit-code v-if="showCheaterMe" :cheater="cheater"></edit-code>
    </div>
</template>
<script>
    import EditCode from './editCode';
    Vue.component('edit-code', EditCode);
    export default {
        data() {
            return {
                cheaters: '',
                name: '',
                showCheater: true,
                showCheaterMe: false,
                cheater:''
            }
        },
        watch: {
            '$route'(to,from) {
                this.name = this.$route.params.name
                this.getCheaters()
            }
        },
        created() {
            bus.$on('show', (bol) => {
                this.showCheaterMe = false
                this.showCheater = true
                this.getCheaters()
            })
        },
        mounted() {
            this.name = this.$route.params.name
            this.getCheaters()
        },
        methods: {
            deleteCheaterCharot(id) {
                const _this = this;
                swal({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  confirmButtonClass: 'btn btn-success',
                  cancelButtonClass: 'btn btn-danger',
                  buttonsStyling: false
                }).then(function () {
                    _this.deleteCheater(id)

                }, function (dismiss) {
                  // dismiss can be 'cancel', 'overlay',
                  // 'close', and 'timer'
                  if (dismiss === 'cancel') {
                    swal(
                      'Cancelled',
                      'Your imaginary file is safe :)',
                      'error'
                    )
                  }
                })
            },
            deleteCheater(id) {
                axios.post('/cheats/deleteCheater', {
                    id: id,
                })
                .then((response) => {
                    console.log(response);
                        swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    this.getCheaters();
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            getCheaters() {
                axios.get('/cheats/showAllCheater', {
                    params: {
                        name: this.name
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    this.cheaters = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
            },
            showEditForm(cheater) {
                this.showCheater = false;
                this.showCheaterMe = true;
                this.cheater = cheater;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .code {
        background-color: #1F0A02;
        color: azure;
    }
    #header {
        font-family: "cursive";
    }
</style>
