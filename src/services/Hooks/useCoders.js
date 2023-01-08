import {useState } from "react";
import axios from "axios";

const useCoders = () => {
    const [coders, setCoders] = useState(); 
    const fetchCoders = () => {
        axios.get(`http://localhost:8888/coders-consultory-server/api/users/admin`).then(function (response) {
            setCoders(response.data)
            console.log(response.data)
        });
    };

    return { coders, fetchCoders };

};

export default useCoders;