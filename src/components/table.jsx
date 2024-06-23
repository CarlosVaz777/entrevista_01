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
    <div class="float-sm-start">

        <div  style={{ textAlign:'center',justifyItems:'center', justifyContent:'center', display:'flex', marginBottom:'30px'}}>
            <Formulario />
        </div>

        <div style={{width: '60rem'}} class="table-responsive">
        <table class="table table-hover table-responsive" >
            <thead>
                <tr>
                <th >ID</th>
                <th >Name</th>
                <th >Email</th>
                <th >Website</th>
                <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody>
            {data?.map((person) => (
                <tr key={person.id}>
                <td >{person.id}</td>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.website}</td>
                <td  align="center"> <EditIcon style={{color: 'green'}}/></td>
                <td > <DeleteIcon style={{color: 'red'}}/></td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
 ); 
}