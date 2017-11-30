import axios from 'axios'
var cheats
var it = []
let myFirstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(axios.get('/cheats/getcheaternames')
            .then((response) => {
                cheats = response.data
                return cheats
            })
            .catch((error) => {
                console.log(error, 'err')
            }))
    }, 250)
})

myFirstPromise.then((successMessage) => {
    for (const [index, value] of successMessage.entries()) {
        it.push({
            name: value,
            url: '/components/cheater',
            icon: 'icon-puzzle',
            index: index
        })
    }
})
export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'icon-speedometer',
            badge: {
                variant: 'primary',
                text: 'Cheaters'
            }
        },
        {
            title: true,
            name: 'Elements',
            class: '',
            wrapper: {
                element: '',
                attributes: {}
            }
        },
        {
            name: 'Cheats',
            url: '/components/cheater',
            icon: 'icon-puzzle',
            children: it
        },
        {
            name: 'Search',
            url: '/components/search-results',
            icon: 'icon-puzzle'
        },
        {
            name: 'Add New Cheat',
            url: '/components/forms',
            icon: 'fa fa-plus-circle'
        },
        {
            name: 'Angular Version',
            url: 'https://angular-ian.herokuapp.com/',
            icon: 'icon-cloud-download',
            class: 'mt-auto',
            variant: 'success'
        }
    ]
}
