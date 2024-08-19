import axios from "axios"

const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_api_url
})

const useAxiosCommon = () => {
    return axiosCommon
}

export default useAxiosCommon