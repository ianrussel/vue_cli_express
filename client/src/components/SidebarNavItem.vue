<template>
    <li :class="classList" @click="handleClick">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: 'sidebar-nav-item',
        data () {
            return {
                cheater: ''
            }
        },
        props: {
            classes: {
                type: String,
                default: ''
            }
        },
        computed: {
            classList () {
                return [
                    'nav-item',
                    ...this.itemClasses
                ]
            },
            itemClasses () {
                return this.classes ? this.classes.split(' ') : ''
            }
        },
        methods: {
            handleClick (e) {
                this.cheater = e.target.innerText
                this.getAll()
            },
            getAll () {
                this.axios.get('/cheats/showAllCheater', {
                    params: {
                        name: this.cheater.trim()
                    }
                })
                .then((response) => {
                    this.bus.$emit('clicked-nav-item', response.data)
                })
                .catch((error) => {
                    console.log(error, 'err')
                })
            }
        }
    }
</script>
