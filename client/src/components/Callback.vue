<template>
    <h1>Yati ka</h1>
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
