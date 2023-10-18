import axios from "axios";

const login = async credentials => {
    const { data } = await axios.post(`${BACKEND_URL}/users/login`, credentials)
    return data
}

export default { login } 