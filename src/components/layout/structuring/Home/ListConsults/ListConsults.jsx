import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function ListUser() {
    const [consults, setConsults] = useState([]);
    useEffect(() => {
        getConsults();
    }, []);

    function getConsults() {
        axios.get('http://localhost:8888/coders-consultory-server/api/users/').then(function(response) {
            console.log(response.data);
            setConsults(response.data);
        });
    }
    const deleteConsult = (id) => {
        axios.delete(`http://localhost:8888/coders-consultory-server/api/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getConsults();
        });
    }
    return (
        <div>
            <h1>List Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>User</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {consults.map((consult, key) =>
                        <tr key={key}>
                            <td>{consult.id}</td>
                            <td>{consult.title}</td>
                            <td>{consult.description}</td>
                            <td>{consult.user}</td>
                            <td>{consult.image_path}</td>
                            <td>
                                <Link to={`consult/${consult.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                <button onClick={() => deleteConsult(consult.id)}>Delete</button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    )
}