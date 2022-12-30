import {useState } from "react";
import axios from "axios";
import useUsername from "./UsernameProvider";

const useUserData = () => {
    const [userData, setUserData] = useState(); 
    const { username } = useUsername();
    const fetchUser = async() => {
        await axios.get(`http://localhost:8888/coders-consultory-server/api/users/${username}`).then(function (response) {
            console.log(response.data);
            setUserData(response.data)
        });
    };

    return { userData, fetchUser };

};

export default useUserData;