<template>
    <div>
        <!-- BEGIN PAGE TITLE-->
        <h3 class="page-title">
            <small>comments bugs</small>
        </h3>
        <!-- END PAGE TITLE-->
        <div class="inbox">
            <div class="row">
                <div class="col-md-2">
                    <div class="inbox-sidebar">
                        <a href="javascript:;" data-title="Compose" class="btn red compose-btn btn-block" v-if="showCompose" @click="show">
                            <i class="fa fa-edit"></i> Compose
                        </a>
                        <div class="inbox-header" v-if="showForm">
                            <h1>Create</h1>
                            <form class="form-inline" v-on:submit.prevent="submitBug">
                                <div class="form-group">
                                    <div class="input-group input-medium">
                                        <input type="text" v-model="fullname" class="form-control" placeholder="Fullname" required>
                                    </div>
                                    <span class="help-block">Full name</span>
                                </div>
                                <div class="form-group">
                                    <div class="input-group input-medium">
                                        <input type="text" v-model="title" class="col-md-3 form-control" placeholder="Title" required>
                                    </div>
                                    <span class="help-block">Title</span>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" v-model="name" required>
                                        <option v-for="(item,index) in names" v-bind:value="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                    <span class="help-block"> A block of help text. </span>
                                </div>
                                <div class="form-group">
                                    <div class="input-group input-medium">
                                        <textarea name="comment"v-model="comment" rows="8" cols="28" required></textarea>
                                    </div>
                                    <span class="help-block">Comment</span>
                                </div>
                                <div class="form-actions">
                                    <div class="row">
                                        <div class="col-md-offset-3 col-md-9">
                                            <button type="submit" class="btn blue">
                                            <i class="fa fa-check"></i> Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="inbox-body">
                        <div class="inbox-header">
                            <h1 class="pull-left">Inbox</h1>
                        </div>
                        <div class="inbox-content">
                            <table class="table table-striped table-advance table-hover">
                                <tbody>
                                    <tr data-messageid="19" v-for="bug in bugs" :title="bug.comment"  v-tippy="{position: 'top', animation: 'fade', duration: 1000, size: 'big', theme:'transparent', arrow: true}">
                                        <td class="inbox-small-cells">
                                            <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                                <input type="checkbox" class="mail-checkbox" value="1">
                                                <span></span>
                                            </label>
                                        </td>
                                        <td class="inbox-small-cells">
                                            <i class="fa fa-bug" v-if="bug.name == 'bug'"></i>
                                            <i class="fa fa-comment" v-if="bug.name == 'comment'"></i>
                                        </td>
                                        <td class="view-message hidden-xs"> {{ bug.fullname }} </td>
                                        <td class="view-message"> {{ bug.title }} </td>
                                        <td class="view-message text-right"> {{ bug.date_created | formatDate }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
@import "/assets/apps/scripts/inbox.min.js";
<script>
    import vueTippy from 'vue-tippy';

    Vue.use(vueTippy);
    export default {
        data() {
            return {
                addUrl: '/cheats/addBug',
                showCompose: true,
                showForm: false,
                fullname: '',
                title: '',
                names: ['comment', 'bug'],
                name: '',
                comment: '',
                bugs: ''
            }
        },
        mounted() {
            this.getAllBugs();
        },
        methods: {
            mouseOver() {
                console.log('shit')
            },
            show() {
                this.showCompose = false,
                this.showForm = true
            },
            submitBug() {
                axios.post(this.addUrl, {
                    fullname: this.fullname,
                    title: this.title,
                    name: this.name,
                    comment: this.comment
                })
                .then((response) => {
                    this.showCompose = true;
                    this.showForm = false;
                    this.getAllBugs();
                    this.title = '';
                    this.fullname = '';
                    this.comment = '';
                })
                .catch((error) => {
                    console.log(error, 'error');
                })
            },
            getAllBugs() {
                axios.get('/cheats/getAllBugs')
                    .then((response) => {
                        this.bugs = response.data;
                        console.log(this.bugs,'aha')
                    })
                    .catch((err) => {
                        console.log(error.toString());
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "/assets/apps/css/inbox.min.css";
</style>
