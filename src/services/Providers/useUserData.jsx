import {useState, createContext } from "react";
import axios from "axios";
import useUsername from "./UsernameProvider";

export const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    
    return (
        <UserDataProvider.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataProvider.Provider>
    );
};

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