import { getCheaterNames } from './views/cheat.js'

let it = []

export function getNames () {
    it.length = 0
    getCheaterNames().then((response) => {
        const tai = [...new Set(response)]
        for (let [index, value] of tai.entries()) {
            it.push({
                name: value,
                url: '/components/cheater',
                icon: 'icon-puzzle',
                index: index
            })
        }
    })
}

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
