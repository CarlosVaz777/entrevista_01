import { Link, Outlet } from "react-router-dom"

export default function Layout (){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="" >EXTRA</Link> 
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}