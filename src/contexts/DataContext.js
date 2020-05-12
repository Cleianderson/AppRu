import {createContext} from 'react'

const DataContext = createContext({
    warns: [{title:'string', content:'string'}],
    foods:[['string']],
    favorites: ['string'],
    day: 0,
})

export default DataContext