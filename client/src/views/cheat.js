import axios from 'axios'
import { getNames } from '../_nav.js'

export function getAll (url, param, showCheater, cheaters) {
    return axios.get(url, param)
    .then((response) => {
        this.showCheater = true
        this.cheaters = response.data
    })
}

export function deleteCheater (id, message, options, deleteMessageShow, cheaters, url, data, headers) {
    this.$dialog.confirm(message, options)
    .then((dialog) => {
        deleteHer(url, data, headers)
        deleteMessageShow = true
        const pos = cheaters.map(elem => elem._id).indexOf(id)
        cheaters.splice(pos, 1)
        setTimeout(() => {
            dialog.close()
            deleteMessageShow = false
        }, 500)
    })
    .catch((error) => {
        console.log(error.toString(), 'cancelled')
    })
}

export function deleteHer (url, data, headers) {
    axios.post(url, data, headers)
    .then((response) => {
        if (response) {
            console.log(response, 'deleted babys')
            getNames()
        }
        console.log(response, 'deleted baby')
    })
    .catch((error) => {
        console.log(error.toString(), 'fuck')
    })
}

export function getCheaterNames () {
    return new Promise((resolve, reject) => {
        resolve(axios.get('/cheats/getcheaternames')
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error, 'err')
        }))
    })
}
