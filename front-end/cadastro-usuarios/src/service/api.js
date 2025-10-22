import axios from 'axios' 

const api = axios.create({ 
    baseURL: 'https://project-cadastro.onrender.com'
    
})

export default api