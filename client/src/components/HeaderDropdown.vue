<template>
    <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
            <img src="/static/img/avatars/1.jpg" class="img-avatar" alt="ianrusseladem">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
        <b-dropdown-item><i class="fa fa-envelope-o"></i> Messages<b-badge variant="success">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-item><i class="fa fa-user"></i> Profile</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item><i class="fa fa-shield"></i> Lock Account</b-dropdown-item>
        <b-dropdown-item><i class="fa fa-lock"></i> Logout</b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
    export default {
        name: 'header-dropdown',
        data: () => {
            return { itemsCount: 0 }
        }
    }
</script>
