import axios, { AxiosError } from 'axios'
export const server = axios.create()
server.interceptors.response.use((config)=>{
    return config

},async(e:AxiosError)=>{
    // if access-token fails
    if(e.status===401 && e.config?.url!=="/api/login"){
        try {
            // get the access-token
            await server.get('/api/auth/access-token')
            const res = await server(e.request)
            return Promise.resolve(res)
        } catch (error) {
            return Promise.reject(e)
        }
    }

    return Promise.reject(e)
})