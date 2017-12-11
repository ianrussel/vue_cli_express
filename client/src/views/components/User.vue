<template>
    <b-card :header="caption">
        <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" class="table-responsive-sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
            <template slot="status" slot-scope="data">
                <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
            </template>
        </b-table>
        <nav>
            <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
    </b-card>
</template>

<script>
    import { isLoggedIn, getAccessToken } from '../../utils/auth.js'
    /**
    * Randomize array element order in-place.
    * Using Durstenfeld shuffle algorithm.
    */
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }
    export default {
        name: 'table',
        props: {
            caption: {
                type: String,
                default: 'Table'
            },
            hover: {
                type: Boolean,
                default: false
            },
            striped: {
                type: Boolean,
                default: false
            },
            bordered: {
                type: Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            fixed: {
                type: Boolean,
                default: false
            }
        },
        data: () => {
            return {
                items: shuffleArray([
                    {username: 'Samppa Nori', registered: '2012/01/01', role: 'Member', status: 'Active'},
                    {username: 'Estavan Lykos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                    {username: 'Chetan Mohamed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                    {username: 'Derick Maximinus', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                    {username: 'Friderik Dávid', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                    {username: 'Yiorgos Avraamu', registered: '2012/01/01', role: 'Member', status: 'Active'},
                    {username: 'Avram Tarasios', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                    {username: 'Quintin Ed', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                    {username: 'Enéas Kwadwo', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                    {username: 'Agapetus Tadeáš', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                    {username: 'Carwyn Fachtna', registered: '2012/01/01', role: 'Member', status: 'Active'},
                    {username: 'Nehemiah Tatius', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                    {username: 'Ebbe Gemariah', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                    {username: 'Eustorgios Amulius', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                    {username: 'Leopold Gáspár', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                    {username: 'Pompeius René', registered: '2012/01/01', role: 'Member', status: 'Active'},
                    {username: 'Paĉjo Jadon', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                    {username: 'Micheal Mercurius', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                    {username: 'Ganesha Dubhghall', registered: '2012/03/01', role: 'Member', status: 'Pending'},
                    {username: 'Hiroto Šimun', registered: '2012/01/21', role: 'Staff', status: 'Active'},
                    {username: 'Vishnu Serghei', registered: '2012/01/01', role: 'Member', status: 'Active'},
                    {username: 'Zbyněk Phoibos', registered: '2012/02/01', role: 'Staff', status: 'Banned'},
                    {username: 'Einar Randall', registered: '2012/02/01', role: 'Admin', status: 'Inactive'},
                    {username: 'Félix Troels', registered: '2012/03/21', role: 'Staff', status: 'Active'},
                    {username: 'Aulus Agmundr', registered: '2012/01/01', role: 'Member', status: 'Pending'}
                ]),
                fields: [
                    {key: 'username'},
                    {key: 'registered'},
                    {key: 'role'},
                    {key: 'status'}
                ],
                currentPage: 1,
                perPage: 5,
                totalRows: 0
            }
        },
        mounted () {
            if (isLoggedIn()) {
                // this.getAllUsers()
                console.log('you are logged')
            }
        },
        methods: {
            getBadge (status) {
                return status === 'Active' ? 'success'
                : status === 'Inactive' ? 'secondary'
                : status === 'Pending' ? 'warning'
                : status === 'Banned' ? 'danger' : 'primary'
            },
            getRowCount (items) {
                return items.length
            },
            getAllUsers () {
                const url = 'https://ianrussel.auth0.com/api/v2/users'
                const fuck = `Bearer ${getAccessToken()}`
                console.log(fuck, 'fuck is fuck')
                const headers = {
                    headers: {
                        'Authorization': `Bearer ${getAccessToken()}`,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }
                this.axios.get(url, {
                    withCredentials: true,
                    params: {
                        q: 'email.raw:"ian.russel@yahoo.com"',
                        search_engine: 'v2'
                    },
                    crossdomain: true,
                    headers
                })
                .then((response) => {
                    console.log(response, 'is response')
                })
                .catch((err) => {
                    console.log(err.toString(), 'err to string')
                })
            }
        }
    }
</script>
