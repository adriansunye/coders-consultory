import { useEffect, useState } from "react";
import axios from 'axios';

const useAxiosCustom = (configParams) => {
    axios.defaults.baseURL = 'http://127.0.0.1:8888/coders-consultory-server/api/';
    const [res, setRes] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       fetchDataUsingAxios(configParams);
    }, []);
    const fetchDataUsingAxios = async() => {
        await axios.request(configParams)
        .then(res => setRes(res)
        .catch(err => setErr(err))
        .finally(() => setLoading(false)));
    }
    return [res, err, loading];
}
export default useAxiosCustom;

