import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Formulario from "../pages/usersForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TablaConsumo(){
    const [data, setData] = useState(null);

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => setData(data));
}, []);

 return(
    <div className="container" >

        <div  >
            <Formulario />
        </div>

        <div style={{ justifyItems:'center', justifyContent:'center', alignItems:'center' }} className="table-responsive">
        <table  className="table table-hover table-responsive"  >
            <thead>
                <tr>
                <th className="text_left">ID</th>
                <th className="text_left">Name</th>
                <th className="text_left">Email</th>
                <th className="text_left">Website</th>
                <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody>
            {data?.map((person) => (
                <tr key={person.id}>
                <td  className="text_left" >{person.id}</td>
                <td  className="text_left">{person.name}</td>
                <td  className="text_left">{person.email}</td>
                <td  className="text_left">{person.website}</td>
                <td  className="text_left"> <EditIcon style={{color: 'green'}}/></td>
                <td > <DeleteIcon style={{color: 'red'}}/></td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
 ); 
}