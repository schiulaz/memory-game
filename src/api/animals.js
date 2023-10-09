import axios from 'axios'

const animalsApi = axios.create({
    baseURL: 'https://fed-team.modyo.cloud/api/',
    
})

export default animalsApi