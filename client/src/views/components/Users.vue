<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="12">
                <c-table hover striped bordered small fixed caption="<i class='fa fa-align-justify'></i> All Users"></c-table>
            </b-col>
        </b-row>
    </div>

</template>

<script>
    import cTable from './User.vue'

    export default {
        name: '',
        components: {cTable}
    }
</script>
