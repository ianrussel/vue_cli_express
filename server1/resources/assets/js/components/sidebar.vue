<template>
    <div class="page-sidebar-wrapper">
        <div class="page-sidebar navbar-collapse collapse">
            <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
                <li class="sidebar-toggler-wrapper hide">
                    <div class="sidebar-toggler">
                        <span></span>
                    </div>
                </li>
                <li class="sidebar-search-wrapper">
                    <form class="sidebar-search  " action="page_general_search_3.html" method="POST">
                        <a href="javascript:;" class="remove">
                            <i class="icon-close"></i>
                        </a>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search...">
                            <span class="input-group-btn">
                                <a href="javascript:;" class="btn submit">
                                    <i class="icon-magnifier"></i>
                                </a>
                            </span>
                        </div>
                    </form>
                </li>
                <!-- <li class="nav-item start " v-for="name in names">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <span class="title">{{name}}</span>
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <router-link to="/vuejs" class="nav-link">
                                <span class="title">{{name.name}} cheatsheet</span>
                            </router-link>
                        </li>
                    </ul>
                </li> -->
                <!--li class="nav-item  active open" v-for="name in names">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <span class="title">{{ name }}</span>
                        <span class="selected"></span>
                        <span class="arrow open"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item">
                            <router-link to="/laravel" class="nav-link">
                                <span class="title">Laravel cheatsheet</span>
                            </router-link>
                        </li>
                    </ul>
                </li-->
                <li class="nav-item start " v-for="name in names">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <span class="title">{{name}}</span>
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <router-link :to="{path: '/puta/' + name }" class="nav-link">
                                <span class="title">{{ name }} cheatsheet</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item active open">
                    <router-link to="/addVue" class="nav-link">
                        <span class="title">Add Cheat Sheet</span>
                    </router-link>
                </li>
                <li class="nav-item start ">
                    <router-link to="/reportBug" class="nav-link">
                        <i class="fa fa-bug"></i>
                        <span class="title">Report Bug</span>
                    </router-link>
                </li>
                <li class="nav-item start ">
                    <a href="https://angular-ian.herokuapp.com" class="nav-link">
                        <i class="fa fa-adn"></i>
                        <span class="title">Angular Version</span>
                    </a>
                </li>
                <!-- <li class="nav-item start">
                    <a href="javascript:;" class="nav-link nav-toggle">
                        <span class="title">Bug</span>
                        <span class="arrow"></span>
                    </a>
                    <ul class="sub-menu">
                        <li class="nav-item start ">
                            <router-link to="/reportBug" class="nav-link">
                                <i class="fa fa-bug"></i>
                                <span class="title">Report Bug</span>
                            </router-link>
                        </li>
                    </ul>
                </li> -->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            names: ''
        }
    },
    created() {
        bus.$on('getnames', (bol) => {
            this.getAllCheaterNames();
        })
    },
    mounted() {
        this.getAllCheaterNames();
    },
    methods: {
        getAllCheaterNames() {
            axios.get('/cheats/getcheaternames')
            .then((response) => {
                console.log(response)
                this.names = response.data
            })
            .catch((error) =>{
                console.log(error)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
