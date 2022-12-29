import { useState, useMemo } from 'react';
import axios from 'axios';
import useAxios from '../../../../services/Providers/AxiosInstanceProvider';



function DeleteConsults(props) {
    
   
    const { data, error, loaded } = useAxios(
        `http://localhost:8888/coders-consultory-server/api/consults/${props.id}`,
        "DELETE",
    )
    const consults = useMemo(() => {
        return data;
    }, [data]);


    if (loaded) {
        return consults;
    }
};

export default DeleteConsults;

