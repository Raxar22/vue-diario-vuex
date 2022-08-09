
import axios from "axios";

const diarioApi = axios.create ({
    baseURL: 'https://vue-demos-dd39c-default-rtdb.europe-west1.firebasedatabase.app'
})


// process.env.NODE_ENV //test en testing, development en run serve

export default diarioApi