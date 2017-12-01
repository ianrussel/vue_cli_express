import axios from 'axios'

export function getAll (url, param, showCheater, cheaters) {
    return axios.get(url, param)
    .then((response) => {
        this.showCheater = true
        this.cheaters = response.data
    })
}

export function deleteCheater (id, message, options, deleteMessageShow, cheaters, url, param) {
    this.$dialog.confirm(message, options)
        .then((dialog) => {
            deleteHer(url, param)
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

export function deleteHer (url, param) {
    axios.post(url, param)
    .then((response) => {
        console.log(response, 'deleted baby')
    })
    .catch((error) => {
        console.log(error.toString())
    })
}
