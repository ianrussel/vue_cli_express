<template>
</template>

<script>
    import { setIdToken, setAccessToken } from '../utils/auth'

    export default {
        name: '',
        data () {
            return {
                key: ''
            }
        },
        mounted () {
            this.$nextTick(() => {
                setAccessToken()
                setIdToken()
                window.location.href = '/'
            })
        }
    }
</script>
