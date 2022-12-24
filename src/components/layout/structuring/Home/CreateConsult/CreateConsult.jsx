import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateConsult() {
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8888/coders-consultory-server/api/user/save', inputs).then(function(response){
            console.log(response.data);
            navigate('/');
        });
    }

    return (
        <div>
        <h1>Create consult</h1>
        <form onSubmit={handleSubmit}>
            <table cellSpacing="10">
                <tbody>
                    <tr>
                        <th>
                            <label>Title: </label>
                        </th>
                        <td>
                            <input type="text" name="title" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>Description: </label>
                        </th>
                        <td> 
                            <input type="text" name="description" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>User: </label>
                        </th>
                        <td>
                            <input type="text" name="user" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label>Image: </label>
                        </th>
                        <td>
                            <input type="text" name="image_path" onChange={handleChange} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2" align ="right">
                            <button>Save</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    )
}