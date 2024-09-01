import axios from 'axios'
export const server = axios.create();

server.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    // wrong or invalid or missing access token
    if(error.response.status===401){
        try {
            await axios.get('/api/access-token');
            // got access token, retry the request
            return await axios.request(error.response.config);
        } catch (error) {
            // didn't get access token
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})