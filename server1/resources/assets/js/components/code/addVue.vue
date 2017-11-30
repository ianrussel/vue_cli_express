<template>
    <div class="row">
        <div class="col-md-12">
            <div class="tabbable-line boxless tabbable-reversed">
                Add Here
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_0">
                        <div class="portlet light bordered">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="icon-equalizer font-red-sunglo"></i>
                                    <span class="caption-subject font-red-sunglo bold uppercase">Add Code</span>
                                    <span class="caption-helper">form actions on top...</span>
                                </div>
                                <div class="actions">
                                    <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                        <i class="icon-cloud-upload"></i>
                                    </a>
                                    <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                        <i class="icon-wrench"></i>
                                    </a>
                                    <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                        <i class="icon-trash"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <!-- BEGIN FORM-->
                                <form action="#" id ="addvueform" class="form-horizontal" v-on:submit.prevent="submit">
                                    <div class="form-body">
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">Title</label>
                                            <div class="col-md-4">
                                                <input type="text" name="title" v-model="title" class="form-control" placeholder="Enter title">
                                                <span class="help-block"> A block of help text. </span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">Name</label>
                                            <div class="col-md-4">
                                                <select class="col-md-3 form-control" v-model="name">
                                                    <option v-for="(item,index) in cheater_names" v-bind:value="item">
                                                        {{ item }}
                                                    </option>
                                                </select>
                                                <div>
                                                    <input type="text" name="name" v-model="name" class="form-control" placeholder="Or Add Name">
                                                </div>
                                                <span class="help-block"> A block of help text. </span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">Description</label>
                                            <div class="col-md-4">
                                                <input type="text" name="description" v-model="description" class="form-control" placeholder="Description">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-md-3 control-label">Code</label>
                                            <div class="col-md-4">
                                                <textarea name="name" rows="8" cols="60" v-model="code" placeholder="Enter code" class="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group last">
                                            <label class="col-md-3 control-label">User</label>
                                            <div class="col-md-4">
                                                <p class="form-control-static"> email@example.com </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-actions">
                                        <div class="row">
                                            <div class="col-md-offset-3 col-md-4">
                                                <button type="submit" class="btn green">Submit</button>
                                                <button type="button" class="btn default">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <!-- END FORM-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                addUrl: '/cheats/addvueform',
                title: '',
                description: '',
                code: '',
                name: '',
                cheater_names: '',
                initial_cheater_names: ['symfony','laravel','vuejs']
            }
        },
        mounted() {
            axios.get('/cheats/getcheaternames')
            .then((response) => {
                console.log(response,'res');
                //return false;
                if (response.data.length > 0) {
                    this.cheater_names = response.data;
                } else {
                    this.cheater_names = this.initial_cheater_names;
                }
            })
            .catch((error) => {
                console.log(error,'err');
            })
        },
        methods: {
            submit() {
                axios.post(this.addUrl, {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    name: this.name
                })
                .then((response) => {
                    this.$router.push('/puta/' + this.name)
                })
                .catch((error) => {
                    console.log(error, 'error');
                })
                bus.$emit('getnames');
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
