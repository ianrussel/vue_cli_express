<template>
    <div class="col-md-12">
        <div class="tabbable-line boxless tabbable-reversed">
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
                            <form action="#" id ="editvueform" class="form-horizontal" v-on:submit.prevent="submit()">
                                <div class="form-body">
                                    <div class="form-group">
                                        <label class="col-md-3 control-label">Title</label>
                                        <div class="col-md-4">
                                            <input type="text" v-model="title" name="title" class="form-control" placeholder="Enter title" required>
                                            <span class="help-block"> A block of help text. </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-3 control-label">Name</label>
                                        <div class="col-md-4">
                                            <select class="col-md-3 form-control"  v-model="name">
                                                <option v-for="(item,index) in initial_cheater_names" v-bind:value="item">
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
                                            <input type="text" v-model="description"  name="description" class="form-control" placeholder="Description" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-md-3 control-label">Code</label>
                                        <div class="col-md-4">
                                            <textarea name="code" rows="8" cols="60"  v-model="code"  placeholder="Enter code" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group last">
                                        <label class="col-md-3 control-label">User</label>
                                        <div class="col-md-4">
                                            <p class="form-control-static"> email@example.com </p>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-offset-3 col-md-4">
                                                <button type="submit" class="btn green">Submit</button>
                                                <button type="button" class="btn default">Cancel</button>
                                            </div>
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
</template>
<script>
    export default {
        data() {
            return {
                title: this.cheater.title,
                description: this.cheater.description,
                code: this.cheater.code,
                name: this.cheater.name,
                id: this.cheater._id,
                editUrl: '/cheats/editvueform',
                cheater_names: '',
                initial_cheater_names: ['symfony','laravel','vuejs'],
                show: false,
                email: '',
                password: ''
            }
        },
        props: ['cheater'],

        methods: {
            submitfuck() {
                alert('fuck')
                axios.post('/cheats/login', {
                    email: this.email,
                    password: this.password
                })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error.toString())
                })
            },
            submit() {
                axios.post(this.editUrl, {
                    title: this.title,
                    description: this.description,
                    code: this.code,
                    name: this.name,
                    id: this.id
                })
                .then((response)=> {
                    if (response.data === 'yawa') {
                        console.log(response.data)
                        this.show = true;
                        return false;
                    }
                    this.show = false;
                    bus.$emit('show');
                })
                .catch((error) => {
                    console.log(error, 'error');
                })
                bus.$emit('show');
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
