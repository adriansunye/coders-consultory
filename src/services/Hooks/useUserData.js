import {useState } from "react";
import axios from "axios";
import useUsername from "../Providers/UsernameProvider";

const useUserData = () => {
    const [userData, setUserData] = useState(); 
    const { username } = useUsername();
    const fetchUser = () => {
        axios.get(`http://localhost:8888/coders-consultory-server/api/users/${username}`).then(function (response) {
            setUserData(response.data)
        });
    };

    return { userData, fetchUser };

};

export default useUserData;